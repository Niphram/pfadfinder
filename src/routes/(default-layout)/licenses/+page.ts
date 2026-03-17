import type { LicenseMeta } from 'rollup-license-plugin';

import type { PageLoad } from './$types';

import { asset } from '$app/paths';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(asset('/oss-licenses.json'));
	const licenses: LicenseMeta[] = await response.json();

	return {
		licenses,
	};
};
