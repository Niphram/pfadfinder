import { createContext } from 'svelte';

import type { SerdeProxy } from '$lib/serde/proxy';

import type { Character } from '../systems/pathfinder/character';

type State = {
	readonly c: SerdeProxy<Character>;
	dirty: boolean;
};

const [getCharInternal, setCharInternal] = createContext<() => State>();

export const getChar = () => getCharInternal()();
export const setChar = setCharInternal;
