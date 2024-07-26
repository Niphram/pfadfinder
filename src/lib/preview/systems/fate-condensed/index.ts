import type { SystemData } from '../system';
import { FATE_CONDENSED_CHAR_MIGRATIONS, FateCondensedCharacter } from './character';
import FateCondensedPage from './page.svelte';

export const FateCondensed = {
	character: FateCondensedCharacter,
	migrations: FATE_CONDENSED_CHAR_MIGRATIONS,
	page: FateCondensedPage
} satisfies SystemData;
