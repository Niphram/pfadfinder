import type { SystemData } from '../system';
import Page from './page.svelte';
import { PATHFINDER_CHAR_MIGRATIONS, PathfinderCharacter } from './data/character';

export const Pathfinder = {
	character: PathfinderCharacter,
	migrations: PATHFINDER_CHAR_MIGRATIONS,
	page: Page
} satisfies SystemData;
