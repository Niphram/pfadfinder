export const CLASSES_KEYS = [
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

	description: string;
	description_formatted: string;
	short_description: string;
};
