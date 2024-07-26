import { getContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';

import type { PathfinderCharacter } from './data';

const CONTEXT_SYMBOL = Symbol('pathfinder char');

export function setChar(store: Writable<PathfinderCharacter>) {
	setContext(CONTEXT_SYMBOL, store);
}

export function char() {
	return getContext<Writable<PathfinderCharacter>>(CONTEXT_SYMBOL);
}
