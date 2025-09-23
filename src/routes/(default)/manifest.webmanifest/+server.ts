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

	const iconSizes = [512, 192];

	const icons = iconSizes.flatMap((size) => [
		{
			src: `./icons/${size}_maskable${iconSuffix}.png`,
			type: 'image/png',
			sizes: `${size}x${size}`,
			purpose: 'maskable',
		},
		{
			src: `./icons/${size}${iconSuffix}.png`,
			type: 'image/png',
			sizes: `${size}x${size}`,
			purpose: 'any',
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
