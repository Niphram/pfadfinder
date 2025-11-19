import { ClassSerializer, number, string } from '$lib/serde';

export const FACET_KEYS = [
	'charm',
	'genius',
	'heroism',
	'sacrifice',
	'sagacity',
	'subterfuge',
] as const;
export type FacetKey = (typeof FACET_KEYS)[number];

class Facet extends ClassSerializer {
	rank = number(0, { min: 0 });

	notes = string('', { maxLength: 1000 });
}

export class Persona extends ClassSerializer {
	charm = new Facet();

	genius = new Facet();

	heroism = new Facet();

	sacrifice = new Facet();

	sagacity = new Facet();

	subterfuge = new Facet();

	notes = string('', { maxLength: 1000 });
}
