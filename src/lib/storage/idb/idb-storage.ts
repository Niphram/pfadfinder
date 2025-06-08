import { GenericDeserializeInto, Serialize } from 'cerialize';
import Dexie from 'dexie';
import { nanoid } from 'nanoid';

import { Character } from '$lib/data';
import { upgradeCharacter } from '$lib/data/upgrade';
import { lazy } from '$lib/utils';

import { VERSIONS, type Schema } from './versions';

const initIDB = lazy(async () => {
	const db = new Dexie('pfadfinder') as Dexie & Schema;

	VERSIONS.forEach((v, i) => v(db.version(i + 1)));

	return db;
});

export class IDBStorage {
	private constructor(private readonly db: Dexie & Schema) {}

	static init = lazy(async () => {
		const db = await initIDB();

		return new IDBStorage(db);
	});

	async saveCharacter(char: Character) {
		const serialized = Serialize(char);

		await this.db.transaction('rw!', [this.db.characters, this.db.characterMetadata], async () =>
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
		await this.db.transaction('rw!', [this.db.characters, this.db.characterMetadata], async () =>
			Promise.all([this.db.characters.delete(id), this.db.characterMetadata.delete(id)])
		);
	}

	async getCharactersMetadata() {
		return this.db.characterMetadata.orderBy('updated_at').reverse().toArray();
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
