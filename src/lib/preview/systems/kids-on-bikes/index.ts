import type { SystemData } from '../system';
import { KidsOnBikesCharacter } from './character';
import { MIGRATION } from './migration';
import KidsOnBikesPage from './page.svelte';

export const KidsOnBikes = {
	character: KidsOnBikesCharacter,
	migrations: MIGRATION,
	page: KidsOnBikesPage
} satisfies SystemData;
