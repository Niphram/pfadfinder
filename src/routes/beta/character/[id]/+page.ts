import { writable } from 'svelte/store';

import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		character: writable({ id: params.id, name: 'Test Character' })
	};
};
