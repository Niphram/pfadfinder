import type { DBSchema, IDBPDatabase } from 'idb';

interface SchemaV1 extends DBSchema {
	settings: {
		key: string;
		value: {
			key: string;
			value: string | number | boolean | Date;
		};
	};
	characters: {
		key: string;
		value: {
			id: string;
			name: string;
			updated_at: Date;
		};
	};
	characterMetadata: {
		key: string;
		value: {
			id: string;
			name: string;
			description: string;
			system: string;
			updated_at: Date;
		};
		indexes: {
			last_updated: Date;
		};
	};
}

export function upgradeToV1(db: IDBPDatabase<SchemaV1>) {
	// KV-Store for settings
	db.createObjectStore('settings', { keyPath: 'key', autoIncrement: false });

	// ObjectStore for all characters
	db.createObjectStore('characters', { keyPath: 'id', autoIncrement: false });

	// ObjectStore to hold character metadata (needs to be kept in sync with characters!)
	const characterMetadataStore = db.createObjectStore('characterMetadata', {
		keyPath: 'id',
		autoIncrement: false
	});

	characterMetadataStore.createIndex('last_updated', 'updated_at');
}
