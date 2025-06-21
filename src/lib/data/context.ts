/**
 * Temporary context so I can migrate all the components.
 */

import { getContext, setContext } from 'svelte';
import type { Readable, Writable } from 'svelte/store';

import type { Character } from './character';

const CHAR_KEY = Symbol('character');

export function setChar(
	c: Writable<Character>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	p: Readable<any>,
	dirty: Readable<boolean>,
	loaded: Readable<boolean>,
	overwriteSave: (data: Character) => Promise<void>,
) {
	setContext(CHAR_KEY, { c, p, dirty, loaded, overwriteSave });
}

export function getChar() {
	return getContext(CHAR_KEY) as {
		c: Writable<Character>;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		p: Readable<any>;
		dirty: Readable<boolean>;
		loaded: Readable<boolean>;
		overwriteSave: (data: Character) => Promise<void>;
	};
}
