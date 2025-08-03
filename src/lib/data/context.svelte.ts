import { getContext, setContext } from 'svelte';

import type { SerdeProxy } from '$lib/serde/proxy';

import type { Character } from './character';

const CHAR_KEY = Symbol('character');

type State = {
	c: SerdeProxy<Character>;
};

export function setChar(state: State) {
	setContext(CHAR_KEY, state);
}

export function getChar() {
	return getContext(CHAR_KEY) as State;
}
