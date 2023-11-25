import type { ISpellsDB } from './db';

const CLASSES_KEYS = [
	'sor',
	'wiz',
	'cleric',
	'druid',
	'ranger',
	'bard',
	'paladin',
	'alchemist',
	'summoner',
	'witch',
	'inquisitor',
	'oracle',
	'antipaladin',
	'magus',
	'adept',
	'mythic',
	'bloodrager',
	'shaman',
	'psychic',
	'medium',
	'mesmerist',
	'occultist',
	'spiritualist',
	'skald',
	'investigator',
	'hunter',
	'summoner_unchained'
] as const;

type Classes = (typeof CLASSES_KEYS)[number];

type ClassesMap = {
	[K in Classes]?: number;
};

export class Spell {
	id: number;

	name: string;

	school: string;
	subschool: string;

	classes: ClassesMap = {};

	casting_time: string;
	components: string;
	duration: string;
	range: string;

	description: string;
	description_formatted: string;
	short_description: string;

	public constructor(spell: ISpellsDB) {
		this.id = spell.id;
		this.name = spell.name;

		this.school = spell.school;
		this.subschool = spell.school;

		for (const cclass of CLASSES_KEYS) {
			const level = spell[cclass];
			if (level !== null) {
				this.classes[cclass] = level;
			}
		}

		this.casting_time = spell.casting_time;
		this.components = spell.components;
		this.duration = spell.duration;
		this.range = spell.range;

		this.description = spell.description;
		this.description_formatted = spell.description_formatted;
		this.short_description = spell.short_description;
	}
}
