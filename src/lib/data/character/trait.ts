import { autoserialize } from 'cerialize';
import { Macro, macro } from '../macros';
import type { Character } from './character';

export class Trait {
	@autoserialize
	name = '';

	@macro
	perDay = new Macro('');

	@autoserialize
	remaining = 0;

	@autoserialize
	description = '';

	recharge(c: Character) {
		if (this.perDay.expr) {
			this.remaining = this.perDay.eval(c);
		}
	}
}
