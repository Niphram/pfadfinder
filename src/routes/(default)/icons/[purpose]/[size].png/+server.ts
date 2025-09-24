import { join } from 'node:path';

import { error } from '@sveltejs/kit';

import type { EntryGenerator, RequestHandler } from './$types';

import { dev } from '$app/environment';

import {
	generateIcon,
	ICON_PUPOSES_SIZES,
	isIconPurpose,
	isIconSize,
} from '$lib/server/icon';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return ICON_PUPOSES_SIZES.map(({ purpose, size }) => ({
		purpose,
		size: `${size}`,
	}));
};

export const GET: RequestHandler = async ({ params }) => {
	const purpose = params.purpose;
	const size = +params.size;

	// Validate params
	if (!isIconPurpose(purpose)) error(404);
	if (!isIconSize(size)) error(404);

	const ICON_PATH = join('static', 'icons', dev ? 'icon_dev.svg' : 'icon.svg');

	const image = generateIcon(ICON_PATH, {
		size,
		masked: purpose === 'any',
	});

	// Works, but this typecast is definetly not pretty
	return new Response(image.png() as unknown as ReadableStream, {
		headers: {
			'Content-Type': 'image/png',
		},
	});
};
