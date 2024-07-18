import { autoserialize, autoserializeAs } from 'cerialize';
import { nanoid } from 'nanoid';

import { Ability } from './abilities';
import { ArmorClass } from './armorclass';
import { Classes } from './class';
import { Combat } from './combat';
import { Equipment } from './equipment';
import { Feat } from './feat';
import { HitPoints } from './hitpoints';
import { Initiative } from './initiative';
import { Money } from './money';
import { Persona } from './persona';
import { Race } from './race';
import { Save } from './saves';
import { Settings } from './settings';
import { SkillList } from './skills';
import { Spells } from './spells';
import { Trait } from './trait';

export class Character {
	@autoserialize
	id = nanoid();

	@autoserialize
	version = 2;

	@autoserialize
	name = 'Unnamed Character';

	@autoserializeAs(Race)
	race = new Race();

	@autoserializeAs(Classes)
	classes = new Classes();

	@autoserializeAs(HitPoints)
	hp = new HitPoints();

	@autoserializeAs(Initiative)
	init = new Initiative();

	@autoserializeAs(Ability)
	str = new Ability('str');
	@autoserializeAs(Ability)
	dex = new Ability('dex');
	@autoserializeAs(Ability)
	con = new Ability('con');
	@autoserializeAs(Ability)
	int = new Ability('int');
	@autoserializeAs(Ability)
	wis = new Ability('wis');
	@autoserializeAs(Ability)
	cha = new Ability('cha');

	@autoserializeAs(Save)
	fort = new Save('fort');
	@autoserializeAs(Save)
	ref = new Save('ref');
	@autoserializeAs(Save)
	will = new Save('will');

	@autoserializeAs(Combat)
	combat = new Combat();

	@autoserializeAs(SkillList)
	skills = new SkillList();

	@autoserializeAs(Trait)
	traits: Trait[] = [];

	@autoserializeAs(Feat)
	feats: Feat[] = [];

	@autoserializeAs(Spells)
	spells = new Spells();

	@autoserializeAs(ArmorClass)
	ac = new ArmorClass();

	@autoserializeAs(Equipment)
	equipment = new Equipment();

	@autoserializeAs(Money)
	money = new Money();

	@autoserializeAs(Persona)
	persona = new Persona();

	@autoserializeAs(Settings)
	settings = new Settings();
}
