import { ClassSerializer, derive, macro, string } from '$lib/serde';

import { Character } from './character.svelte';

export class Initiative extends ClassSerializer {
	misc = macro('0');

	notes = string('');

	readonly mod = derive<Character>((c) => c.dex.mod + c.init.misc);
}
