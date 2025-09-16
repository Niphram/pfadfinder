import { nanoid } from 'nanoid';

import { ClassSerializer, macro, number, string, type SerdeProxy } from '$lib/serde';

export class Trait extends ClassSerializer {
	id = string(nanoid());

	name = string('');

	perDay = macro('', { optional: true });

	remaining = number(0);

	description = string('');

	recharge(this: SerdeProxy<Trait>) {
		this.remaining = this.perDay ?? 0;
	}
}
