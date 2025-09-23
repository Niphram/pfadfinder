import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

import { dev } from '$app/environment';
import { resolve } from '$app/paths';

import { ICON_PUPOSES_SIZES } from '$lib/server/icon';

export const prerender = true;

/**
 * Generate different webmanifests for dev and prod
 */
export const GET: RequestHandler = () => {
	const appNameSuffix = dev ? ' DEV' : '';
	const appIdSuffix = dev ? '-dev' : '';

	const icons = ICON_PUPOSES_SIZES.flatMap(({ purpose, size }) => [
		{
			src: resolve('/(default)/icons/[purpose]/[size].png', {
				purpose,
				size: `${size}`,
			}),
			type: 'image/png',
			sizes: `${size}x${size}`,
			purpose,
		},
	]);

	return json({
		name: `Pfadfinder${appNameSuffix}`,
		short_name: `Pfadfinder${appNameSuffix}`,
		description: 'Charactersheet for Pathfinder 1st Edition',
		theme_color: '#DBCA9A',
		background_color: '#ECE3CA',
		display: 'standalone',
		scope: './',
		start_url: './',
		id: `pfadfinder${appIdSuffix}`,
		icons,
	});
};
