import { autoserialize, inheritSerialization } from 'cerialize';

import { VersionedCharacter, type CharacterMigrationFn } from '../../versioned-character';

export const PATHFINDER_CHAR_MIGRATIONS: CharacterMigrationFn[] = [];

@inheritSerialization(VersionedCharacter)
export class PathfinderCharacter extends VersionedCharacter {
	constructor() {
		super('pathfinder', PATHFINDER_CHAR_MIGRATIONS.length);
	}

	@autoserialize
	dex = 10;
}
