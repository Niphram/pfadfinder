import { nanoid } from 'nanoid';

import { array, boolean, derive, enumeration, macro, number, object, string } from '$lib/serde';
import type { SerdeProxy } from '$lib/serde/proxy';
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

export class SpellAttackDamage {
	damage = string('');

	type = string('');
}

export class SpellAttack {
	hasAttack = boolean(false);

	type = enumeration<SpellAttackType>('none');

	mod = number(0);

	critRange = number(20);

	critMultiplier = number(2);
}

export class SpellSave {
	hasSave = boolean(false);

	effect = string('');

	dcMod = number(0);
}

export class SpellCommonProps {
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

	savingThrow = object(new SpellSave());

	spellResistance = string('');

	attack = object(new SpellAttack());

	damage = array(() => object(new SpellAttackDamage()), []);

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
		const abilityDc = (dcAbility ? c[dcAbility].mod : 0) + c.spells.dcBonus;
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
				this.savingThrow.value.hasSave.value &&
					`${this.savingThrow.value.effect.value} (DC ${this.savingThrow.value.dcMod.value})`,
			],
			['Spell Resistance', this.spellResistance.value],
		].filter((e) => !!e[1]),
	);

	recharge(this: SerdeProxy<SpellLikeAbility>) {
		if (this.type === 'perDay') this.remaining = this.perDay;
	}
}

export class SpellLevelList {
	known = number(0);

	perDay = number(0);

	perDayBonus = number(0);

	dcBonus = number(0);

	spells = array(() => object(new Spell()), []);

	readonly dc = derive<Character>(
		(c) => 10 + SPELL_LEVELS.indexOf(this.level)! + c.spells[this.level].known,
	);

	readonly totalPerDay = derive<Character>(
		(c) => c.spells[this.level].perDay + c.spells[this.level].perDayBonus,
	);

	readonly prepared = $derived(mapSum(this.spells.value, (s) => s.value.prepared.value));

	readonly used = $derived(mapSum(this.spells.value, (s) => s.value.used.value));

	constructor(private level: SpellLevel) {}
}

export class Spells {
	dcAbility = enumeration<AbilityKey, true>(undefined);

	dcBonus = macro('0');

	level_0 = object(new SpellLevelList('level_0'));

	level_1 = object(new SpellLevelList('level_1'));

	level_2 = object(new SpellLevelList('level_2'));

	level_3 = object(new SpellLevelList('level_3'));

	level_4 = object(new SpellLevelList('level_4'));

	level_5 = object(new SpellLevelList('level_5'));

	level_6 = object(new SpellLevelList('level_6'));

	level_7 = object(new SpellLevelList('level_7'));

	level_8 = object(new SpellLevelList('level_8'));

	level_9 = object(new SpellLevelList('level_9'));

	spellLikeAbilities = array(() => object(new SpellLikeAbility()), []);
}
