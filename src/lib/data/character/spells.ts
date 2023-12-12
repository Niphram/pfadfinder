import { autoserialize, autoserializeAs } from 'cerialize';
import { Derive } from '../macros';

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

	readonly dc = new Derive((c) => 10 + /*spellMod*/ this.parent.dc.eval(c) + this.dcMod);

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

	get dc() {
		return this.parent.dc;
	}

	constructor(private parent: SpellLevelList) {
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
}
