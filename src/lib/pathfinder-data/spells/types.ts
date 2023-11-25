export const CLASSES_KEYS = [
	'adept',
	'alchemist',
	'antipaladin',
	'bard',
	'bloodrager',
	'cleric',
	'druid',
	'hunter',
	'inquisitor',
	'investigator',
	'magus',
	'medium',
	'mesmerist',
	'mythic',
	'occultist',
	'oracle',
	'paladin',
	'psychic',
	'ranger',
	'shaman',
	'skald',
	'sor',
	'spiritualist',
	'summoner',
	'summoner_unchained',
	'witch',
	'wiz'
] as const;

export type Classes = (typeof CLASSES_KEYS)[number];

export type ClassesMap = {
	[K in Classes]?: number;
};

export type ISpell = {
	id: number;
	name: string;

	school: string;
	subschool: string;

	classes: ClassesMap;

	casting_time: string;
	components: string;
	duration: string;
	range: string;
	targets: string;

	saving_throw: string;
	spell_resistance: string;

	descriptor: string;

	description: string;
	description_formatted: string;
	short_description: string;
};
