import type { IDBPDatabase, IDBPTransaction } from 'idb';

import { upgradeToV1 } from './v1';

export type UpgradeFunction = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	db: IDBPDatabase<any>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	tx: IDBPTransaction<any, string, 'versionchange'>
) => Promise<void> | void;

export const VERSIONS = [upgradeToV1] satisfies UpgradeFunction[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetSchemaFromUpgradeFunction<UF extends (db: IDBPDatabase<any>) => void> =
	Parameters<UF>[0] extends IDBPDatabase<infer Schema> ? Schema : never;

type LastElementOf<T extends readonly unknown[]> =
	T extends readonly [...unknown[], infer Last] ? Last : T[0];

export type Schema = GetSchemaFromUpgradeFunction<LastElementOf<typeof VERSIONS>>;
