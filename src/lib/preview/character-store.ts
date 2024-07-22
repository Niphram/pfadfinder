import { GenericDeserializeInto, Serialize } from 'cerialize';
import { writable, type Writable } from 'svelte/store';

import { initDB } from './idb-store';
import { SYSTEM_MAP } from './systems';
import { PathfinderCharacter } from './systems/pathfinder/data/character';
import type { CharacterMigrationFn, VersionedCharacter } from './systems/versioned-character';
import { debounce } from './utils/debounce';
import { lazy } from './utils/lazy';

function migrateCharacter(data: VersionedCharacter, migrations: CharacterMigrationFn[]) {
	return migrations
		.slice(data.version)
		.reduce((previousCharData, migrateFunction) => migrateFunction(previousCharData), data);
}

type DBTypes = {
	characters: {
		key: string;
		value: VersionedCharacter;
		indexes: {
			id_idx: string;
			updated_idx: Date;
		};
	};
};

const dbInstance = lazy(() =>
	initDB<DBTypes>('data', [
		(db) => {
			const characterStore = db.createObjectStore('characters', { keyPath: 'id' });

			characterStore.createIndex('id_idx', 'id', { unique: true });
			characterStore.createIndex('updated_idx', 'updated');
		}
	])
);

export async function listCharacters(system?: string) {
	const db = await dbInstance();

	const characters = await db.getAllFromIndex('characters', 'updated_idx');

	return (system ? characters.filter((char) => char.system === system) : characters).reverse();
}

export async function addCharacter() {
	const db = await dbInstance();

	const result = await db.add('characters', Serialize(new PathfinderCharacter()));

	return result;
}

export async function saveCharacter<C extends VersionedCharacter>(character: C) {
	const db = await dbInstance();

	const result = await db.add('characters', Serialize(character));

	return result;
}

export async function deleteCharacter(id: string) {
	const db = await dbInstance();

	await db.delete('characters', id);
}

export async function loadCharacter(id: string) {
	const db = await dbInstance();

	const char = await db.getFromIndex('characters', 'id_idx', id);
	if (!char) throw new Error('Not Found'); // TODO: Error Page?

	if (!(char.system in SYSTEM_MAP)) throw new Error('Unknown System'); // TODO: Error Page?

	const system = SYSTEM_MAP[char.system];

	if (char.version > system.migrations.length) throw new Error('Unknown Version'); // TODO: Error Page?

	const w = writable(
		GenericDeserializeInto(
			migrateCharacter(char, system.migrations),
			system.character,
			new system.character()
		)
	);

	const debouncedSave = debounce(async (v: VersionedCharacter) => {
		console.log('SAVE!!!');
		await db.put('characters', Serialize(v));
	}, 1000);

	w.subscribe(debouncedSave);

	// TODO: Fix this mess
	type SYSTEMS = typeof SYSTEM_MAP;
	type RETURN = {
		[Property in keyof SYSTEMS]: {
			character: Writable<SYSTEMS[Property]['character']['prototype']>;
			Character: SYSTEMS[Property]['character']['prototype'];
			SheetComponent: SYSTEMS[Property]['page']['prototype'];
		};
	}[keyof SYSTEMS];

	return {
		character: w,
		Character: system.character,
		SheetComponent: system.page
	} as unknown as RETURN;
}
