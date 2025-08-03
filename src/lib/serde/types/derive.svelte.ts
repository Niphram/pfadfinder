import type { Character } from '$lib/data';
import type { SerdeProxy } from '../proxy';

export class Derive<C = Character> {
	eval(char: C) {
		return this.cb(char);
	}

	constructor(private cb: (char: C) => number) {}
}

export function derive<C = Character>(cb: (c: SerdeProxy<C>) => number) {
	return new Derive(cb);
}
