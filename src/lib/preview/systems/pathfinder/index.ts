import type { SystemData } from '$lib/preview/types/system';

import Page from './components/page.svelte';
import { PATHFINDER_CHAR_MIGRATIONS, PathfinderCharacter } from './data/character';

export const Pathfinder = {
	character: PathfinderCharacter,
	migrations: PATHFINDER_CHAR_MIGRATIONS,
	page: Page
} satisfies SystemData;
