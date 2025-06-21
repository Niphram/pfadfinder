import { autoserialize, autoserializeAs } from 'cerialize';

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
	@autoserialize
	rank = 0;

	@autoserialize
	notes = '';
}

export class Persona {
	@autoserializeAs(Facet)
	charm = new Facet();

	@autoserializeAs(Facet)
	genius = new Facet();

	@autoserializeAs(Facet)
	heroism = new Facet();

	@autoserializeAs(Facet)
	sacrifice = new Facet();

	@autoserializeAs(Facet)
	sagacity = new Facet();

	@autoserializeAs(Facet)
	subterfuge = new Facet();

	@autoserialize
	notes = '';
}
