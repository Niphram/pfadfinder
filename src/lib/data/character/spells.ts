import { mapSum, withSign } from '$lib/utils';
import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';
import { nanoid } from 'nanoid';
import { Character, type AbilityKey } from '.';
import { array, boolean, derive, enumeration, macro, number, object, string } from '$lib/serde';
import type { SerdeProxy } from '$lib/serde/proxy';

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

	details(level: number, c: SerdeProxy<Character>) {
		const dcAbility = c.spells.dcAbility;
		const abilityDc = (dcAbility ? c[dcAbility].mod : 0) + c.spells.dcBonus;
		const saveDc = 10 + level + this.savingThrow.dcMod + abilityDc;

		let attackBonus = this.attack.mod;

		switch (this.attack.type) {
			case 'touch':
				attackBonus += c.combat.bab.mod.eval(c) + c.str.mod.eval(c);
				break;
			case 'rangedTouch':
				attackBonus += c.combat.bab.mod.eval(c) + c.dex.mod.eval(c);
				break;
			case 'cmb':
				attackBonus += c.combat.cmb.mod.eval(c);
				break;
			case 'str':
			case 'dex':
			case 'con':
			case 'wis':
			case 'int':
			case 'cha':
				attackBonus += c[this.attack.type].mod.eval(c);
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
		].filter((e) => !!e[1]);
	}
}

export const SPELL_LIKE_COUNT_TYPES = ['constant', 'atWill', 'perDay'] as const;
export type SpellLikeCountTypes = (typeof SPELL_LIKE_COUNT_TYPES)[number];

export class SpellLikeAbility extends SpellCommonProps {
	type = enumeration<SpellLikeCountTypes>('atWill');

	perDay = number(1);

	remaining = number(0);

	get details() {
		return [
			['School', this.school],
			['Casting Time', this.castingTime],
			['Range', this.range],
			['Area', this.area],
			['Targets', this.targets],
			['Duration', this.duration],
			['Effect', this.effect],
			[
				'Saving Throw',
				this.savingThrow.hasSave && `${this.savingThrow.effect} (DC ${this.savingThrow.dcMod})`,
			],
			['Spell Resistance', this.spellResistance],
		].filter((e) => !!e[1]);
	}

	recharge() {
		if (this.type === 'perDay') this.remaining = this.perDay;
	}
}

export class SpellLevelList {
	known = number(0);

	perDay = number(0);

	perDayBonus = number(0);

	dcBonus = number(0);

	readonly dc = derive<Character>((c) => 10 + this.level + c.spells[this.level].known);

	readonly totalPerDay = derive<Character>(
		(c) => c.spells[this.level].perDay + c.spells[this.level].perDayBonus,
	);

	get prepared() {
		return mapSum(this.spells, (s) => s.prepared);
	}

	get used() {
		return mapSum(this.spells, (s) => s.used);
	}

	spells = array(() => object(new Spell()), []);

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
