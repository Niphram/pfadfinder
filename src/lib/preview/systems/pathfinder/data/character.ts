import { autoserialize } from 'cerialize';
import { nanoid } from 'nanoid';

import type { CharacterBase, CharacterMigrationFn } from '$lib/preview/types/character';

export const PATHFINDER_CHAR_MIGRATIONS: CharacterMigrationFn[] = [];

export class PathfinderCharacter implements CharacterBase {
	@autoserialize
	readonly id = nanoid();

	@autoserialize
	readonly system = 'pathfinder';

	@autoserialize
	readonly version = PATHFINDER_CHAR_MIGRATIONS.length;

	@autoserialize
	name = 'Unnamed Character';

	@autoserialize
	dex = 10;
}
