import { autoserialize, autoserializeAs } from 'cerialize';
import { Derive } from '../macros';

export const SPELL_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
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

	readonly dc = new Derive((c) => 10 + /*spellMod*/ this.parent.parent.dc.eval(c) + this.dcMod);

	constructor(private parent: Spell) {}
}

export class Spell {
	@autoserialize
	name = 'Unnamed Spell';

	@autoserialize
	prepared = 0;

	@autoserialize
	isDomainSpell = false;

	@autoserialize
	school = '';

	@autoserialize
	classAndLevel = '';

	@autoserialize
	castingTime = '';

	@autoserialize
	components = '';

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
	savingThrow: SpellSave;

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

	constructor(public parent: SpellLevelList) {
		this.savingThrow = new SpellSave(this);
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

	@autoserializeAs(Spell)
	spells: Spell[] = [];

	constructor(private level: SpellLevel) {}
}

export class Spells {
	@autoserializeAs(SpellLevelList)
	0 = new SpellLevelList(0);

	@autoserializeAs(SpellLevelList)
	1 = new SpellLevelList(1);

	@autoserializeAs(SpellLevelList)
	2 = new SpellLevelList(2);

	@autoserializeAs(SpellLevelList)
	3 = new SpellLevelList(3);

	@autoserializeAs(SpellLevelList)
	4 = new SpellLevelList(4);

	@autoserializeAs(SpellLevelList)
	5 = new SpellLevelList(5);

	@autoserializeAs(SpellLevelList)
	6 = new SpellLevelList(6);

	@autoserializeAs(SpellLevelList)
	7 = new SpellLevelList(7);

	@autoserializeAs(SpellLevelList)
	8 = new SpellLevelList(8);

	@autoserializeAs(SpellLevelList)
	9 = new SpellLevelList(9);
}
