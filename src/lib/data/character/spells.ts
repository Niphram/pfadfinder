import { mapSum, withSign } from '$lib/utils';
import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';
import { nanoid } from 'nanoid';
import type { AbilityKey, Character } from '.';
import { Derive, Macro, macro } from '../macros';

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
	'level_9'
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
	'none'
] as const;
export type SpellAttackType = (typeof SPELL_ATTACK_TYPE)[number];

export class SpellAttackDamage {
	@autoserialize
	damage = '';

	@autoserialize
	type = '';
}

export class SpellAttack {
	@autoserialize
	hasAttack = false;

	@autoserialize
	type: SpellAttackType = 'none';

	@autoserialize
	mod = 0;

	@autoserialize
	critRange = 20;

	@autoserialize
	critMultiplier = 2;
}

export class SpellSave {
	@autoserialize
	hasSave = false;

	@autoserialize
	effect = '';

	@autoserialize
	dcMod = 0;
}

export class SpellCommonProps {
	id = nanoid();

	@autoserialize
	name = 'Unnamed Spell';

	@autoserialize
	school = '';

	@autoserialize
	classAndLevel = '';

	@autoserialize
	castingTime = '';

	@autoserialize
	range = '';

	@autoserialize
	area = '';

	@autoserialize
	targets = '';

	@autoserialize
	effect = '';

	@autoserialize
	duration = '';

	@autoserializeAs(SpellSave)
	savingThrow = new SpellSave();

	@autoserialize
	spellResistance = '';

	@autoserializeAs(SpellAttack)
	attack = new SpellAttack();

	@autoserializeAs(SpellAttackDamage)
	damage: SpellAttackDamage[] = [];

	@autoserialize
	description = '';

	@autoserialize
	notes = '';
}

@inheritSerialization(SpellCommonProps)
export class Spell extends SpellCommonProps {
	@autoserialize
	prepared = 0;

	@autoserialize
	used = 0;

	@autoserialize
	isDomainSpell = false;

	@autoserialize
	components = '';

	details(level: number, c: Character) {
		const dcAbility = c.spells.dcAbility;
		const abilityDc = (dcAbility ? c[dcAbility].mod.eval(c) : 0) + c.spells.dcBonus.eval(c);
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
					})`
			],
			...this.damage.map((d, i) => [`Damage #${i + 1}`, `${d.damage} ${d.type}`])
		].filter((e) => !!e[1]);
	}
}

export const SPELL_LIKE_COUNT_TYPES = ['constant', 'atWill', 'perDay'] as const;
export type SpellLikeCountTypes = (typeof SPELL_LIKE_COUNT_TYPES)[number];

@inheritSerialization(SpellCommonProps)
export class SpellLikeAbility extends SpellCommonProps {
	@autoserialize
	type: SpellLikeCountTypes = 'atWill';

	@autoserialize
	perDay = 1;

	@autoserialize
	remaining = 0;

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
				this.savingThrow.hasSave && `${this.savingThrow.effect} (DC ${this.savingThrow.dcMod})`
			],
			['Spell Resistance', this.spellResistance]
		].filter((e) => !!e[1]);
	}

	recharge() {
		if (this.type === 'perDay') this.remaining = this.perDay;
	}
}

export class SpellLevelList {
	@autoserialize
	known = 0;

	@autoserialize
	perDay = 0;

	@autoserialize
	perDayBonus = 0;

	@autoserialize
	dcBonus = 0;

	readonly dc = new Derive((c) => 10 + this.level + c.spells[this.level].known);

	readonly totalPerDay = new Derive(
		(c) => c.spells[this.level].perDay + c.spells[this.level].perDayBonus
	);

	get prepared() {
		return mapSum(this.spells, (s) => s.prepared);
	}

	get used() {
		return mapSum(this.spells, (s) => s.used);
	}

	@autoserializeAs(Spell)
	spells: Spell[] = [];

	constructor(private level: SpellLevel) {}
}

export class Spells {
	@autoserialize
	dcAbility?: AbilityKey;

	@macro
	dcBonus = new Macro('0');

	@autoserializeAs(SpellLevelList)
	level_0 = new SpellLevelList('level_0');

	@autoserializeAs(SpellLevelList)
	level_1 = new SpellLevelList('level_1');

	@autoserializeAs(SpellLevelList)
	level_2 = new SpellLevelList('level_2');

	@autoserializeAs(SpellLevelList)
	level_3 = new SpellLevelList('level_3');

	@autoserializeAs(SpellLevelList)
	level_4 = new SpellLevelList('level_4');

	@autoserializeAs(SpellLevelList)
	level_5 = new SpellLevelList('level_5');

	@autoserializeAs(SpellLevelList)
	level_6 = new SpellLevelList('level_6');

	@autoserializeAs(SpellLevelList)
	level_7 = new SpellLevelList('level_7');

	@autoserializeAs(SpellLevelList)
	level_8 = new SpellLevelList('level_8');

	@autoserializeAs(SpellLevelList)
	level_9 = new SpellLevelList('level_9');

	@autoserializeAs(SpellLikeAbility)
	spellLikeAbilities: SpellLikeAbility[] = [];
}
