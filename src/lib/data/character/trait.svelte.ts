import { nanoid } from 'nanoid';

import { ClassSerializer, macro, number, string, type SerdeProxy } from '$lib/serde';

export class Trait extends ClassSerializer {
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
