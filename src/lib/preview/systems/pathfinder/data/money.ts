import { autoserialize } from 'cerialize';

export class Money {
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
}
