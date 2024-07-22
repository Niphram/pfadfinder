import { autoserialize, autoserializeAs, serialize } from 'cerialize';
import { nanoid } from 'nanoid';

import type { SYSTEM_MAP } from '.';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CharacterMigrationFn = (data: any) => any;

export const AutoDate = autoserializeAs({
	Serialize(): Date {
		return new Date();
	}
});

export abstract class VersionedCharacter {
	@autoserialize
	readonly id = nanoid();

	@serialize
	readonly system;

	@serialize
	readonly version;

	@AutoDate
	readonly updated = new Date();

	@autoserialize
	name = 'Unnamed Character';

	constructor(system: keyof typeof SYSTEM_MAP, version: number) {
		this.system = system;
		this.version = version;
	}
}
