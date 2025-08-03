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

	details(level: number, c: SerdeProxy<Character>) {
		const dcAbility = c.spells.dcAbility;
		const abilityDc = (dcAbility ? c[dcAbility].mod : 0) + c.spells.dcBonus;
		const saveDc = 10 + level + this.savingThrow.value.dcMod.value + abilityDc;

		let attackBonus = this.attack.value.mod.value;

		switch (this.attack.value.type.value) {
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
				attackBonus += c[this.attack.value.type.value].mod;
				break;
			case 'none':
		}

		return [
			['School', this.school.value],
			['Casting Time', this.castingTime.value],
			['Components', this.components.value],
			['Range', this.range.value],
			['Area', this.area.value],
			['Targets', this.targets.value],
			['Duration', this.duration.value],
			['Effect', this.effect.value],
			[
				'Saving Throw',
				this.savingThrow.value.hasSave.value &&
					`${this.savingThrow.value.effect.value} (DC ${saveDc})`,
			],
			['Spell Resistance', this.spellResistance.value],
			[
				'Attack',
				this.attack.value.hasAttack.value &&
					`${withSign(attackBonus)} (${this.attack.value.type.value}) (Crit ≥${this.attack.value.critRange.value} for x${
						this.attack.value.critMultiplier.value
					})`,
			],
			...this.damage.value.map((d, i) => [
				`Damage #${i + 1}`,
				`${d.value.damage.value} ${d.value.type.value}`,
			]),
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
		].filter((e) => !!e[1]);
	}

	recharge() {
		if (this.type.value === 'perDay') this.remaining.value = this.perDay.value;
	}
}

export class SpellLevelList {
	known = number(0);

	perDay = number(0);

	perDayBonus = number(0);

	dcBonus = number(0);

	readonly dc = derive<Character>(
		(c) => 10 + SPELL_LEVELS.indexOf(this.level)! + c.spells[this.level].known,
	);

	readonly totalPerDay = derive<Character>(
		(c) => c.spells[this.level].perDay + c.spells[this.level].perDayBonus,
	);

	get prepared() {
		return mapSum(this.spells.value, (s) => s.value.prepared.value);
	}

	get used() {
		return mapSum(this.spells.value, (s) => s.value.used.value);
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
