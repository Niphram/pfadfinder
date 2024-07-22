export class Derive<C, R> {
	eval(char: C) {
		return this.cb(char);
	}

	constructor(private cb: (char: C) => R) {}
}
