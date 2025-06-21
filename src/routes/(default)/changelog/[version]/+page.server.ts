import { glob, readFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

import { parseMarkdown } from '$lib/server/markdown';

import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () => {
	const changelogsIter = await glob('./changelog/*.md');

	const changelogPaths = await Array.fromAsync(changelogsIter);

	return changelogPaths.map((path) => ({
		version: basename(path, '.md'),
	}));
};

export const load: PageServerLoad = async ({ params }) => {
	const fileContent = (await readFile(resolve('changelog', `${params.version}.md`))).toString();

	const { html } = parseMarkdown(fileContent);
	return {
		changelogHtml: html,
	};
};
