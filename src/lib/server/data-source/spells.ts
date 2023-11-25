import { CLASSES_KEYS, type ClassesMap, type ISpell } from '$lib/pathfinder-data/spells';
import fs from 'node:fs/promises';
import sanitize from 'sanitize-html';
import { parse } from './parser';

export type ISpellsDB = {
	id: number;
	name: string;
	school: string;
	subschool: string;
	descriptor: string;
	spell_level: string;
	casting_time: string;
	components: string;
	costly_components: 0 | 1;
	range: string;
	area: string;
	effect: string;
	targets: string;
	duration: string;
	dismissible: 0 | 1;
	shapeable: 0 | 1;
	saving_throw: string;
	spell_resistance: string;
	description: string;
	description_formatted: string;
	source: string;
	full_text: string;
	verbal: 0 | 1;
	somatic: 0 | 1;
	material: 0 | 1;
	focus: 0 | 1;
	divine_focus: 0 | 1;
	deity: string;
	SLA_Level: number;
	domain: string;
	short_description: string;
	acid: 0 | 1;
	air: 0 | 1;
	chaotic: 0 | 1;
	cold: 0 | 1;
	curse: 0 | 1;
	darkness: 0 | 1;
	death: 0 | 1;
	disease: 0 | 1;
	earth: 0 | 1;
	electricity: 0 | 1;
	emotion: 0 | 1;
	evil: 0 | 1;
	fear: 0 | 1;
	fire: 0 | 1;
	force: 0 | 1;
	good: 0 | 1;
	language_dependent: 0 | 1;
	lawful: 0 | 1;
	light: 0 | 1;
	mind_affecting: 0 | 1;
	pain: 0 | 1;
	poison: 0 | 1;
	shadow: 0 | 1;
	sonic: 0 | 1;
	water: 0 | 1;
	linktext: string;
	material_costs: number | null;
	bloodline: string;
	patron: string;
	mythic_text: string;
	augmented: string;
	sor: number | null;
	wiz: number | null;
	cleric: number | null;
	druid: number | null;
	ranger: number | null;
	bard: number | null;
	paladin: number | null;
	alchemist: number | null;
	summoner: number | null;
	witch: number | null;
	inquisitor: number | null;
	oracle: number | null;
	antipaladin: number | null;
	magus: number | null;
	adept: number | null;
	mythic: number | null;
	bloodrager: number | null;
	shaman: number | null;
	psychic: number | null;
	medium: number | null;
	mesmerist: number | null;
	occultist: number | null;
	spiritualist: number | null;
	skald: number | null;
	investigator: number | null;
	hunter: number | null;
	summoner_unchained: number | null;
	haunt_statistics: '';
	ruse: 0 | 1;
	draconic: 0 | 1;
	meditative: 0 | 1;
};

export const dynamicTyping: (keyof ISpellsDB)[] = [
	'id',
	'costly_components',
	'dismissible',
	'shapeable',
	'verbal',
	'somatic',
	'material',
	'focus',
	'divine_focus',
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
	'summoner_unchained',
	'ruse',
	'draconic',
	'meditative',
	'acid',
	'air',
	'chaotic',
	'cold',
	'curse',
	'darkness',
	'death',
	'disease',
	'earth',
	'electricity',
	'emotion',
	'evil',
	'fear',
	'fire',
	'force',
	'good',
	'language_dependent',
	'lawful',
	'light',
	'mind_affecting',
	'pain',
	'poison',
	'shadow',
	'sonic',
	'water',
	'material_costs',
	'SLA_Level'
];

function parseSpell(spell: ISpellsDB): ISpell {
	const {
		id,
		name,
		school,
		subschool,
		casting_time,
		components,
		duration,
		range,
		description,
		short_description,
		targets,
		saving_throw,
		spell_resistance,
		descriptor
	} = spell;

	const classes: ClassesMap = {};
	for (const cclass of CLASSES_KEYS) {
		const level = spell[cclass];
		if (level !== null) {
			classes[cclass] = level;
		}
	}

	const description_formatted = sanitize(spell.description_formatted, {
		allowedTags: [
			'b',
			'br',
			'caption',
			'i',
			'li',
			'p',
			'sup',
			'table',
			'tbody',
			'td',
			'tfoot',
			'thead',
			'th',
			'tr',
			'ul'
		],
		allowedAttributes: {
			table: ['border'],
			td: ['colspan', 'style'],
			th: ['colspan', 'rowspan', 'style']
		}
	});

	return {
		id,
		name,
		school,
		subschool,
		classes,
		casting_time,
		components,
		duration,
		range,
		description,
		description_formatted,
		short_description,
		targets,
		saving_throw,
		spell_resistance,
		descriptor
	};
}

const CSV_FILE = 'data/spells.csv';

const fileHandle = await fs.open(CSV_FILE);
const parsedSpells = await parse<ISpellsDB>(fileHandle.createReadStream(), dynamicTyping);

const spellMap = new Map<string, ISpell>();

parsedSpells.forEach((spell) => {
	spellMap.set(spell.name, parseSpell(spell));
});

export const SPELLS = spellMap;
