import { nanoid } from 'nanoid';

import { macro, number, string } from '$lib/serde';
import type { SerdeProxy } from '$lib/serde/proxy';

export class Trait {
	id = string(nanoid());

	name = string('');

	perDay = macro('');

	remaining = number(0);

	description = string('');

	recharge(this: SerdeProxy<Trait>) {
		if (this.$perDay.expr !== '') {
			this.remaining = this.perDay;
		}
	}
}
