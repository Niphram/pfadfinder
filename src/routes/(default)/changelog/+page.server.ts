import { glob } from 'node:fs/promises';
import { basename } from 'node:path';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const changelogsIter = await glob('./changelog/*.md');

	const changelogPaths = await Array.fromAsync(changelogsIter);

	const changelogs = changelogPaths.map((path) => ({
		date: basename(path, '.md')
	}));

	return { changelogs };
};
