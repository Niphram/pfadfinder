import { autoserialize } from 'cerialize';

import { formula } from '../makros';

export class Initiative {
	@autoserialize
	misc = formula('0');

	@autoserialize
	notes = '';

	get mod() {
		return formula('@dex.mod+@init.misc');
	}
}
