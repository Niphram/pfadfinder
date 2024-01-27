import { autoserialize } from 'cerialize';

export class Coins {
	@autoserialize
	pp = 0;

	@autoserialize
	gp = 0;

	@autoserialize
	sp = 0;

	@autoserialize
	cp = 0;

	@autoserialize
	notes = '';

	get weight() {
		return (this.pp + this.gp + this.sp + this.cp) / 50;
	}
}
