import { autoserialize } from 'cerialize';

import { formula } from '../macros';
import { Macro, macro } from '../macros/macro';

export class Initiative {
	@macro
	misc = new Macro('0');

	@autoserialize
	notes = '';

	get mod() {
		return formula('@dex.mod+@init.misc');
	}
}
