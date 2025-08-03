import { number, object, string } from '$lib/serde';

export const FACET_KEYS = [
	'charm',
	'genius',
	'heroism',
	'sacrifice',
	'sagacity',
	'subterfuge',
] as const;
export type FacetKey = (typeof FACET_KEYS)[number];

class Facet {
	rank = number(0);

	notes = string('');
}

export class Persona {
	charm = object(new Facet());

	genius = object(new Facet());

	heroism = object(new Facet());

	sacrifice = object(new Facet());

	sagacity = object(new Facet());

	subterfuge = object(new Facet());

	notes = string('');
}
