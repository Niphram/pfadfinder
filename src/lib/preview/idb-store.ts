import {
	openDB,
	type DBSchema,
	type IDBPDatabase,
	type IDBPTransaction,
	type StoreNames
} from 'idb';

export type UpgradeFunc<DBTypes extends DBSchema | unknown> = (
	db: IDBPDatabase<DBTypes>,
	tx: IDBPTransaction<DBTypes, StoreNames<DBTypes>[], 'versionchange'>
) => void;

export async function initDB<DBTypes extends DBSchema | unknown>(
	name: string,
	migrations: UpgradeFunc<DBTypes>[]
) {
	const db = await openDB<DBTypes>(name, migrations.length, {
		upgrade(db, oldVersion, newVersion, tx) {
			for (let version = oldVersion; version < (newVersion ?? 0); ++version) {
				console.log(`Upgrading DB "${name}" to version "${version + 1}"`);
				migrations[version](db, tx);
			}
		}
	});

	return db;
}
