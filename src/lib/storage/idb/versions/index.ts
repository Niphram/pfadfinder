import type { Version } from 'dexie';

import { upgradeToV1, type SchemaV1 } from './v1';

export type UpgradeFunction = (version: Version) => void;

export const VERSIONS = [upgradeToV1] satisfies UpgradeFunction[];

export type Schema = SchemaV1;
