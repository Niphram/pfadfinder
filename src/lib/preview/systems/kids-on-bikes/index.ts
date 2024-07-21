import type { SystemData } from '$lib/preview/types/system';

import { KidsOnBikesCharacter } from './character';
import { MIGRATION } from './migration';
import KidsOnBikesPage from './page.svelte';

export const KidsOnBikes = {
	character: KidsOnBikesCharacter,
	migrations: MIGRATION,
	page: KidsOnBikesPage
} satisfies SystemData;
