import type { Character } from '../character';

export class Derive<R, C = Character> {
	eval(char: C) {
		return this.cb(char);
	}

	constructor(private cb: (char: C) => R) {}
}
