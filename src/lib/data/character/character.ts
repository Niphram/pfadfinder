import { nanoid } from 'nanoid';

import { array, number, object, string } from '$lib/serde';

import { VERSION_NUMBER } from '../upgrade';
import { Ability } from './abilities.svelte';
import { ArmorClass } from './armorclass';
import { Classes } from './class.svelte';
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
	id = string(nanoid());

	version = number(VERSION_NUMBER);

	name = string('Unnamed Character');

	system = string('pathfinder');

	get description() {
		return this.classes.list.map((c) => `${c.name} ${c.level}`).join(', ');
	}

	race = object(new Race());

	classes = object(new Classes());

	hp = object(new HitPoints());

	init = object(new Initiative());

	str = object(new Ability('str'));
	dex = object(new Ability('dex'));
	con = object(new Ability('con'));
	int = object(new Ability('int'));
	wis = object(new Ability('wis'));
	cha = object(new Ability('cha'));

	fort = object(new Save('fort'));
	ref = object(new Save('ref'));
	will = object(new Save('will'));

	combat = object(new Combat());

	skills = object(new SkillList());

	traits = array(() => object(new Trait()), []);

	feats = array(() => object(new Feat()), []);

	spells = object(new Spells());

	ac = object(new ArmorClass());

	equipment = object(new Equipment());

	money = object(new Money());

	persona = object(new Persona());

	settings = object(new Settings());
}
