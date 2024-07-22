import { autoserialize } from 'cerialize';
import { nanoid } from 'nanoid';
import type { PathfinderCharacter } from './character';
import { Macro, serializeMacro } from '$lib/preview/macro/macro';

export class Trait {
	@autoserialize
	id = nanoid();

	@autoserialize
	name = '';

	@serializeMacro
	perDay = new Macro('');

	@autoserialize
	remaining = 0;

	@autoserialize
	description = '';

	recharge(c: PathfinderCharacter) {
		if (this.perDay.expr) {
			this.remaining = this.perDay.eval(c);
		}
	}
}
