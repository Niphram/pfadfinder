import { GenericDeserializeInto, Serialize } from 'cerialize';
import { writable, type Writable } from 'svelte/store';
import { initDB } from './idb-store';
import {
	PATHFINDER_CHAR_MIGRATIONS,
	PathfinderCharacter
} from './systems/pathfinder/data/character';
import { lazy } from './utils/lazy';
import { debounce } from './utils/debounce';
import type { CharacterBase, CharacterMigrationFn } from './types/character';

function migrateCharacter(data: CharacterBase & object, migrations: CharacterMigrationFn[]) {
	return migrations
		.slice(data.version)
		.reduce((previousCharData, migrateFunction) => migrateFunction(previousCharData), data);
}

type DBTypes = {
	characters: {
		key: string;
		value: CharacterBase;
		indexes: {
			id_idx: string;
		};
	};
};

const dbInstance = lazy(() =>
	initDB<DBTypes>('data', [
		(db) => {
			db.createObjectStore('characters', { keyPath: 'id' }).createIndex('id_idx', 'id', {
				unique: true
			});
		}
	])
);

export async function listCharacters() {
	const db = await dbInstance();

	const characters = await db.getAll('characters');

	return characters;
}

export async function addCharacter() {
	const db = await dbInstance();

	const result = await db.add('characters', Serialize(new PathfinderCharacter()));

	return result;
}

export async function deleteCharacter(id: string) {
	const db = await dbInstance();

	await db.delete('characters', id);
}

const CHARACTER_TYPES: Record<string, [new () => CharacterBase, CharacterMigrationFn[]]> = {
	pathfinder: [PathfinderCharacter, PATHFINDER_CHAR_MIGRATIONS]
};

function determineSystem(char: CharacterBase) {
	const types = CHARACTER_TYPES[char.system];

	if (!types) throw new Error('Unknown System!');

	return types;
}

export async function loadCharacter(id: string) {
	const db = await dbInstance();

	const char = await db.getFromIndex('characters', 'id_idx', id);
	if (!char) throw new Error('Not Found');

	const [CharConstructor, migrations] = determineSystem(char);

	const w = writable(
		GenericDeserializeInto(
			migrateCharacter(char, migrations),
			CharConstructor,
			new CharConstructor()
		)
	);

	const debouncedSave = debounce(async (v: CharacterBase) => {
		console.log('SAVE!!!');
		await db.put('characters', Serialize(v));
	}, 1000);

	w.subscribe(debouncedSave);

	return w as Writable<PathfinderCharacter>;
}
