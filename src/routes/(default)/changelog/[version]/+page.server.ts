import { glob, readFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

import type { EntryGenerator, PageServerLoad } from './$types';

import { parseMarkdown } from '$lib/server/markdown';

export const entries: EntryGenerator = async () => {
	const changelogsIter = await glob('./changelog/*.md');

	const changelogPaths = await Array.fromAsync(changelogsIter);

	return changelogPaths.map((path) => ({
		version: basename(path, '.md'),
	}));
};

export const load: PageServerLoad = async ({ params }) => {
	const fileContent = (
		await readFile(resolve('changelog', `${params.version}.md`))
	).toString();

	const { html } = parseMarkdown(fileContent);
	return {
		title: params.version,
		changelogHtml: html,
	};
};
