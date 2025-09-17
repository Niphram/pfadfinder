import { nanoid } from 'nanoid';

import { ClassSerializer, macro, number, string, type SerdeProxy } from '$lib/serde';

export class Trait extends ClassSerializer {
	id = string(nanoid());

	name = string('Unnamed Trait', { minLength: 1, maxLength: 100 });

	perDay = macro('', { optional: true });

	remaining = number(0, { min: 0 });

	description = string('', { maxLength: 4000 });

	recharge(this: SerdeProxy<Trait>) {
		this.remaining = this.perDay ?? 0;
	}
}
