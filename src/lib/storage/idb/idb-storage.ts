import { GenericDeserializeInto, Serialize } from 'cerialize';
import Dexie, { type EntityTable } from 'dexie';
import { nanoid } from 'nanoid';

import { Character } from '$lib/data';
import { upgradeCharacter } from '$lib/data/upgrade';
import { lazy } from '$lib/utils';

import { type Schema } from './versions';

const initIDB = lazy(async () => {
	const db = new Dexie('pfadfinder') as Dexie & DexieSchema;

	db.version(1).stores({
		characters: 'id',
		characterMetadata: 'id, updated_at',
		settings: 'key'
	});

	return db;
});

type DexieSchema = {
	[K in keyof Schema]: EntityTable<Schema[K]['value'], 'id'>;
};

export class IDBStorage {
	private constructor(private readonly db: Dexie & DexieSchema) {}

	static init = lazy(async () => {
		const db = await initIDB();

		return new IDBStorage(db);
	});

	async saveCharacter(char: Character) {
		const serialized = Serialize(char);

		await this.db.transaction('rw', [this.db.characters, this.db.characterMetadata], async () =>
			Promise.all([
				this.db.characters.put(serialized),
				this.db.characterMetadata.put({
					id: char.id,
					name: char.name,
					description: char.description,
					system: char.system,
					updated_at: new Date()
				})
			])
		);
	}

	async deleteCharacter(id: string) {
		await this.db.transaction('rw', [this.db.characters, this.db.characterMetadata], async () =>
			Promise.all([this.db.characters.delete(id), this.db.characterMetadata.delete(id)])
		);
	}

	async getCharactersMetadata() {
		const data = await this.db.characterMetadata.orderBy('updated_at').reverse().toArray();

		return data;
	}

	async getCharacterById(id: string) {
		const charData = await this.db.characters.get(id);

		return (
			charData && GenericDeserializeInto(upgradeCharacter(charData), Character, new Character())
		);
	}

	async duplicateCharacterById(id: string) {
		const charData = await this.db.characters.get(id);
		if (!charData) return;

		const char = GenericDeserializeInto(upgradeCharacter(charData), Character, new Character());
		if (!char) return;

		char.id = nanoid();

		this.saveCharacter(char);
	}
}
