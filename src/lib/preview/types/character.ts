import { autoserialize, inheritSerialization } from 'cerialize';
import { nanoid } from 'nanoid';

export type CharacterMigration = (previous: object) => object;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function VersionedCharacter<C extends new (...args: any[]) => NonNullable<unknown>>(
	system: string,
	Char: C,
	migrations: CharacterMigration[]
) {
	const versionedChar = class extends Char {
		static MIGRATIONS = migrations;

		id = nanoid();

		system = system;

		version = migrations.length;

		name = 'Unnamed Character';
	};

	inheritSerialization(Char)(versionedChar.prototype);
	autoserialize(versionedChar.prototype, 'id');
	autoserialize(versionedChar.prototype, 'system');
	autoserialize(versionedChar.prototype, 'version');
	autoserialize(versionedChar.prototype, 'name');

	return versionedChar;
}
