import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

import { dev } from '$app/environment';

export const prerender = true;

/**
 * Generate different webmanifests for dev and prod
 */
export const GET: RequestHandler = () => {
	const appNameSuffix = dev ? ' DEV' : '';
	const appIdSuffix = dev ? '-dev' : '';
	const iconSuffix = dev ? '_dev' : '';

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
		icons: [
			{
				src: `./icons/512${iconSuffix}.png`,
				type: 'image/png',
				sizes: '512x512',
			},
			{
				src: `./icons/192${iconSuffix}.png`,
				type: 'image/png',
				sizes: '192x192',
			},
		],
	});
};
