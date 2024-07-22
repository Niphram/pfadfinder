import { autoserialize } from 'cerialize';

import { Derive } from '$lib/preview/macro/derive';
import { Macro, serializeMacro } from '$lib/preview/macro/macro';
import type { PathfinderCharacter } from './character';

export class Initiative {
	@serializeMacro
	misc = new Macro('0');

	@autoserialize
	notes = '';

	readonly mod = new Derive((c: PathfinderCharacter) => c.dex.mod.eval(c) + c.init.misc.eval(c));
}
