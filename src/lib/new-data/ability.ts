import { autoserialize } from 'cerialize';

export class Ability {
	constructor() {}

	@autoserialize
	base = 10;

	@autoserialize
	race = 0;

	@autoserialize
	bonus = 0;

	@autoserialize
	condition = 0; // ?

	@autoserialize
	notes = '';

	@autoserialize
	misc = 0;

	get total() {
		return this.base + this.race + this.bonus + this.condition + this.misc;
	}

	get mod() {
		return Math.floor(this.total - 10 / 2);
	}
}
