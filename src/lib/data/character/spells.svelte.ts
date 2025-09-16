import { nanoid } from 'nanoid';

import {
	array,
	boolean,
	ClassSerializer,
	derive,
	enumeration,
	macro,
	number,
	string,
	type SerdeProxy,
} from '$lib/serde';
import { mapSum, withSign } from '$lib/utils';

import { Character, type AbilityKey } from '.';

export const SPELL_LEVELS = [
	'level_0',
	'level_1',
	'level_2',
	'level_3',
	'level_4',
	'level_5',
	'level_6',
	'level_7',
	'level_8',
	'level_9',
] as const;
export type SpellLevel = (typeof SPELL_LEVELS)[number];

export const SPELL_ATTACK_TYPE = [
	'touch',
	'rangedTouch',
	'cmb',
	'str',
	'dex',
	'con',
	'wis',
	'int',
	'cha',
	'none',
] as const;
export type SpellAttackType = (typeof SPELL_ATTACK_TYPE)[number];

export class SpellAttackDamage extends ClassSerializer {
	damage = string('');

	type = string('');
}

export class SpellAttack extends ClassSerializer {
	hasAttack = boolean(false);

	type = enumeration<SpellAttackType>('none');

	mod = number(0);

	critRange = number(20);

	critMultiplier = number(2);
}

export class SpellSave extends ClassSerializer {
	hasSave = boolean(false);

	effect = string('');

	dcMod = number(0);
}

export class SpellCommonProps extends ClassSerializer {
	id = nanoid();

	name = string('Unnamed Spell');

	school = string('');

	classAndLevel = string('');

	castingTime = string('');

	range = string('');

	area = string('');

	targets = string('');

	effect = string('');

	duration = string('');

	readonly savingThrow = new SpellSave();

	spellResistance = string('');

	readonly attack = new SpellAttack();

	damage = array(() => new SpellAttackDamage(), []);

	description = string('');

	notes = string('');
}

export class Spell extends SpellCommonProps {
	prepared = number(0);

	used = number(0);

	isDomainSpell = boolean(false);

	components = string('');

	details(this: SerdeProxy<Spell>, level: number, c: SerdeProxy<Character>): [string, boolean][] {
		const dcAbility = c.spells.dcAbility;
		const abilityDc = (dcAbility ? c[dcAbility].mod : 0) + (c.spells.dcBonus ?? 0);
		const saveDc = 10 + level + this.savingThrow.dcMod + abilityDc;

		let attackBonus = this.attack.mod;

		switch (this.attack.type) {
			case 'touch':
				attackBonus += c.combat.bab.mod + c.str.mod;
				break;
			case 'rangedTouch':
				attackBonus += c.combat.bab.mod + c.dex.mod;
				break;
			case 'cmb':
				attackBonus += c.combat.cmb.mod;
				break;
			case 'str':
			case 'dex':
			case 'con':
			case 'wis':
			case 'int':
			case 'cha':
				attackBonus += c[this.attack.type].mod;
				break;
			case 'none':
		}

		return [
			['School', this.school],
			['Casting Time', this.castingTime],
			['Components', this.components],
			['Range', this.range],
			['Area', this.area],
			['Targets', this.targets],
			['Duration', this.duration],
			['Effect', this.effect],
			['Saving Throw', this.savingThrow.hasSave && `${this.savingThrow.effect} (DC ${saveDc})`],
			['Spell Resistance', this.spellResistance],
			[
				'Attack',
				this.attack.hasAttack &&
					`${withSign(attackBonus)} (${this.attack.type}) (Crit ≥${this.attack.critRange} for x${
						this.attack.critMultiplier
					})`,
			],
			...this.damage.map((d, i) => [`Damage #${i + 1}`, `${d.damage} ${d.type}`]),
		].filter((e) => !!e[1]) as [string, boolean][];
	}
}

export const SPELL_LIKE_COUNT_TYPES = ['constant', 'atWill', 'perDay'] as const;
export type SpellLikeCountTypes = (typeof SPELL_LIKE_COUNT_TYPES)[number];

export class SpellLikeAbility extends SpellCommonProps {
	type = enumeration<SpellLikeCountTypes>('atWill');

	perDay = number(1);

	remaining = number(0);

	readonly details = $derived(
		[
			['School', this.school.value],
			['Casting Time', this.castingTime.value],
			['Range', this.range.value],
			['Area', this.area.value],
			['Targets', this.targets.value],
			['Duration', this.duration.value],
			['Effect', this.effect.value],
			[
				'Saving Throw',
				this.savingThrow.hasSave.value &&
					`${this.savingThrow.effect.value} (DC ${this.savingThrow.dcMod.value})`,
			],
			['Spell Resistance', this.spellResistance.value],
		].filter((e) => !!e[1]),
	);

	recharge(this: SerdeProxy<SpellLikeAbility>) {
		if (this.type === 'perDay') this.remaining = this.perDay;
	}
}

export class SpellLevelList extends ClassSerializer {
	known = number(0);

	perDay = number(0);

	perDayBonus = number(0);

	dcBonus = number(0);

	spells = array(() => new Spell(), []);

	readonly dc = derive<Character>(
		(c) => 10 + SPELL_LEVELS.indexOf(this.level)! + c.spells[this.level].known,
	);

	readonly totalPerDay = derive<Character>(
		(c) => c.spells[this.level].perDay + c.spells[this.level].perDayBonus,
	);

	readonly prepared = $derived(mapSum(this.spells.value, (s) => s.prepared.value));

	readonly used = $derived(mapSum(this.spells.value, (s) => s.used.value));

	constructor(private level: SpellLevel) {
		super();
	}
}

export class Spells extends ClassSerializer {
	dcAbility = enumeration<AbilityKey, true>(undefined);

	dcBonus = macro('', { optional: true });

	readonly level_0 = new SpellLevelList('level_0');

	readonly level_1 = new SpellLevelList('level_1');

	readonly level_2 = new SpellLevelList('level_2');

	readonly level_3 = new SpellLevelList('level_3');

	readonly level_4 = new SpellLevelList('level_4');

	readonly level_5 = new SpellLevelList('level_5');

	readonly level_6 = new SpellLevelList('level_6');

	readonly level_7 = new SpellLevelList('level_7');

	readonly level_8 = new SpellLevelList('level_8');

	readonly level_9 = new SpellLevelList('level_9');

	readonly spellLikeAbilities = array(() => new SpellLikeAbility(), []);
}
