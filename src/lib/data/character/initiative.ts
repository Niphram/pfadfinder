import { autoserialize } from 'cerialize';

import { Derive } from '../macros';
import { Macro, macro } from '../macros/macro';

export class Initiative {
	@macro
	misc = new Macro('0');

	@autoserialize
	notes = '';

	readonly mod = new Derive((c) => c.dex.mod.eval(c) + c.init.misc.eval(c));
}
