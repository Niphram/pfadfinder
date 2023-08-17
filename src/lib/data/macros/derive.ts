import type { Character } from '../character';

export class Derive<R> {
	eval(char: Character) {
		return this.cb(char);
	}

	constructor(private cb: (char: Character) => R) {}
}
