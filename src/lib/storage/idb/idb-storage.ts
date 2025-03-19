import { GenericDeserializeInto, Serialize } from 'cerialize';
import { openDB, type IDBPDatabase } from 'idb';
import { nanoid } from 'nanoid';

import { Character } from '$lib/data';
import { upgradeCharacter } from '$lib/data/upgrade';
import { lazy } from '$lib/utils';

import { VERSIONS, type Schema, type UpgradeFunction } from './versions';

const initIDB = lazy(async () => {
	const db = await openDB<Schema>('pfadfinder', VERSIONS.length, {
		async upgrade(db, oldVersion, newVersion, tx) {
			newVersion ??= VERSIONS.length;

			console.log(`Upgrading Database from version ${oldVersion} to version ${newVersion}`);

			for (let v = oldVersion; v < newVersion; v++) {
				const upgradeFunction = VERSIONS[v] as UpgradeFunction;
				await upgradeFunction(db, tx);
			}

			await tx.done;
		}
	});

	return db;
});

export class IDBStorage {
	private constructor(private readonly db: IDBPDatabase<Schema>) {}

	static init = lazy(async () => {
		const db = await initIDB();

		return new IDBStorage(db);
	});

	async saveCharacter(char: Character) {
		const serialized = Serialize(char);

		const tx = this.db.transaction(['characters', 'characterMetadata'], 'readwrite', {
			durability: 'default'
		});

		await Promise.all([
			tx.objectStore('characters').put(serialized),
			tx.objectStore('characterMetadata').put({
				id: char.id,
				name: char.name,
				description: char.description,
				system: char.system,
				updated_at: new Date()
			}),
			tx.done
		]);
	}

	async deleteCharacter(id: string) {
		const tx = this.db.transaction(['characters', 'characterMetadata'], 'readwrite', {
			durability: 'default'
		});

		await Promise.all([
			tx.objectStore('characters').delete(id),
			tx.objectStore('characterMetadata').delete(id),
			tx.done
		]);
	}

	async getCharactersMetadata() {
		const characters = await this.db.getAllFromIndex('characterMetadata', 'last_updated');

		return characters.reverse();
	}

	async getCharacterById(id: string) {
		const charData = await this.db.get('characters', id);

		return (
			charData && GenericDeserializeInto(upgradeCharacter(charData), Character, new Character())
		);
	}

	async duplicateCharacterById(id: string) {
		const charData = await this.db.get('characters', id);
		if (!charData) return;

		const char = GenericDeserializeInto(upgradeCharacter(charData), Character, new Character());
		if (!char) return;

		char.id = nanoid();

		this.saveCharacter(char);
	}
}
