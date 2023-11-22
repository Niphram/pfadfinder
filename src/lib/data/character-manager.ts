import { browser } from '$app/environment';
import { openDB, type IDBPDatabase, type DBSchema } from 'idb';
import { Character } from './character/character';
import { Serialize } from 'cerialize';

const DB_NAME = 'pfadfinder-data';
const METADATA_STORE = 'metadata';
const CHAR_STORE = 'characters';

type Schema = {
	[METADATA_STORE]: {
		value: any;
	};

	[CHAR_STORE]: {
		key: 'id';
		value: Character;
	};
};

let db: IDBPDatabase<Schema>;
if (browser) {
	db = await openDB(DB_NAME, 1, {
		upgrade(db) {
			db.createObjectStore(CHAR_STORE, {
				keyPath: 'id',
				autoIncrement: true
			});

			db.createObjectStore(METADATA_STORE);
		}
	});
}

export async function listCharacters() {
	if (browser) {
		const res = await db.getAll(CHAR_STORE);
		console.log(res);
	}
}

export async function newCharacter() {
	if (browser) {
		await db.add(CHAR_STORE, Serialize(new Character()));
	}
}

export async function test() {
	if (browser) {
		await db.add(METADATA_STORE, 0, 'last-loaded-character');
		const r = await db.get(METADATA_STORE, 'last-loaded-character');
		console.log(r);
	}
}

export function idbWritable2<T extends object>();
