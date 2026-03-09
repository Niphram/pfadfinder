import type { Dependency } from 'rollup-plugin-license';

import type { PageLoad } from './$types';

import { asset } from '$app/paths';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(asset('/licenses.json'));
	const licenses: Dependency[] = await response.json();

	return {
		licenses,
	};
};
