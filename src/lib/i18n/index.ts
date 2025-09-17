import { moosmannStores } from 'moosmann-svelte';

import en from './en';

export type TKeys = typeof en;

export const { t, isInitialized, isLoading, locale, localeKeys } =
	moosmannStores<typeof en>('en', {
		en,
	});
