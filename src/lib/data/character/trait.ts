import { nanoid } from 'nanoid';

import { macro, number, string } from '$lib/serde';
import type { SerdeProxy } from '$lib/serde/proxy';

import type { Character } from './character';

export class Trait {
	id = string(nanoid());

	name = string('');

	perDay = macro('');

	remaining = number(0);

	description = string('');

	recharge(c: SerdeProxy<Character>) {
		if (this.perDay.expr !== '') {
			this.remaining.value = this.perDay.eval(c);
		}
	}
}
