import { nanoid } from 'nanoid';

import { array, ClassSerializer, number, string } from '$lib/serde';
import { VERSION_NUMBER } from '$lib/systems/pathfinder/migrations';

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

export class Character extends ClassSerializer {
	id = string(nanoid());

	version = number(VERSION_NUMBER);

	name = string('Unnamed Character', { minLength: 1, maxLength: 100 });

	system = string('pathfinder');

	get description() {
		return this.classes.list.value
			.map((c) => `${c.name.value} ${c.level.value}`)
			.join(', ');
	}

	readonly race = new Race();

	readonly classes = new Classes();

	readonly hp = new HitPoints();

	readonly init = new Initiative();

	readonly str = new Ability('str');
	readonly dex = new Ability('dex');
	readonly con = new Ability('con');
	readonly int = new Ability('int');
	readonly wis = new Ability('wis');
	readonly cha = new Ability('cha');

	readonly fort = new Save('fort');
	readonly ref = new Save('ref');
	readonly will = new Save('will');

	readonly combat = new Combat();

	readonly skills = new SkillList();

	traits = array(() => new Trait(), []);

	feats = array(() => new Feat(), []);

	readonly spells = new Spells();

	readonly ac = new ArmorClass();

	readonly equipment = new Equipment();

	readonly money = new Money();

	readonly persona = new Persona();

	readonly settings = new Settings();
}
