import { nanoid } from 'nanoid';

import { array, number, object, string } from '$lib/serde';

import { VERSION_NUMBER } from '../upgrade';
import { Ability } from './abilities.svelte';
import { ArmorClass } from './armorclass.svelte';
import { Classes } from './class.svelte';
import { Combat } from './combat.svelte';
import { Equipment } from './equipment.svelte';
import { Feat } from './feat.svelte';
import { HitPoints } from './hitpoints.svelte';
import { Initiative } from './initiative.svelte';
import { Money } from './money.svelte';
import { Persona } from './persona.svelte';
import { Race } from './race.svelte';
import { Save } from './saves.svelte';
import { Settings } from './settings.svelte';
import { SkillList } from './skills.svelte';
import { Spells } from './spells.svelte';
import { Trait } from './trait.svelte';

export class Character {
	id = string(nanoid());

	version = number(VERSION_NUMBER);

	name = string('Unnamed Character');

	system = string('pathfinder');

	get description() {
		return this.classes.value.list.value.map((c) => `${c.name.value} ${c.level.value}`).join(', ');
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
