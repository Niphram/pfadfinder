import type { SerdeProxy } from '../proxy';

export class Derive<C, R = number> {
	eval(char: C) {
		return this.cb(char);
	}

	constructor(private cb: (char: C) => R) {}
}

export function derive<C, R = number>(cb: (c: SerdeProxy<C>) => R) {
	return new Derive(cb);
}
