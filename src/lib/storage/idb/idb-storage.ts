import Dexie from 'dexie';
import { nanoid } from 'nanoid';

import { SERIALIZE_SYMBOL } from '$lib/serde/interfaces';
import { lazy } from '$lib/utils';

import { Character } from '$lib/data';
import { upgradeCharacterAndDeserialize } from '$lib/data/upgrade';

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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const serialized: any = char[SERIALIZE_SYMBOL]();

		await this.db.transaction(
			'rw!',
			[this.db.characters, this.db.characterMetadata],
			async () =>
				Promise.all([
					this.db.characters.put(serialized),
					this.db.characterMetadata.put({
						id: char.id.value,
						name: char.name.value,
						description: char.description,
						system: char.system.value,
						updated_at: new Date(),
					}),
				]),
		);
	}

	async deleteCharacter(id: string) {
		await this.db.transaction(
			'rw!',
			[this.db.characters, this.db.characterMetadata],
			async () =>
				Promise.all([
					this.db.characters.delete(id),
					this.db.characterMetadata.delete(id),
				]),
		);
	}

	async getCharactersMetadata() {
		return this.db.characterMetadata.orderBy('updated_at').reverse().toArray();
	}

	async getCharacterById(id: string) {
		const charData = await this.db.characters.get(id);

		return charData && upgradeCharacterAndDeserialize(charData);
	}

	async duplicateCharacterById(id: string) {
		const charData = await this.db.characters.get(id);
		if (!charData) return;

		const char = upgradeCharacterAndDeserialize(charData);
		if (!char) return;

		char.id.value = nanoid();
		char.name.value = `${char.name.value} (Copy)`;

		this.saveCharacter(char);
	}
}
