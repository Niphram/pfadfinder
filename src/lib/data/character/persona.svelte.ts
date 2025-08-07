import { number, string } from '$lib/serde';
import { ClassSerializer } from '$lib/serde/class-serializer';

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
	rank = number(0);

	notes = string('');
}

export class Persona extends ClassSerializer {
	charm = new Facet();

	genius = new Facet();

	heroism = new Facet();

	sacrifice = new Facet();

	sagacity = new Facet();

	subterfuge = new Facet();

	notes = string('');
}
