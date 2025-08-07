import type { SerdeProxy } from '../proxy';

export class Derive<C> {
	eval(char: C) {
		return this.cb(char);
	}

	constructor(private cb: (char: C) => number) {}
}

export function derive<C>(cb: (c: SerdeProxy<C>) => number) {
	return new Derive(cb);
}
