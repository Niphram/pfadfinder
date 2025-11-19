import { createContext } from 'svelte';

import type { SerdeProxy } from '$lib/serde/proxy';

import type { Character } from '../systems/pathfinder/character';

type State = {
	readonly c: SerdeProxy<Character>;
	dirty: boolean;
};

export const [getChar, setChar] = createContext<State>();
