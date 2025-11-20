import type { EntityTable, Version } from 'dexie';

export type SchemaV1 = {
	settings: EntityTable<
		{
			key: string;
			value: string | number | boolean | Date;
		},
		'key'
	>;
	characters: EntityTable<
		{
			id: string;
			name: string;
			system: string;
		},
		'id'
	>;
	characterMetadata: EntityTable<
		{
			id: string;
			name: string;
			description: string;
			system: string;
			updated_at: Date;
		},
		'id'
	>;
};

export function upgradeToV1(version: Version) {
	version.stores({
		characters: 'id',
		characterMetadata: 'id, updated_at',
		settings: 'key',
	});
}
