import { nanoid } from 'nanoid';

import { ClassSerializer, number, optionalMacro, string, type SerdeProxy } from '$lib/serde';

export class Trait extends ClassSerializer {
	id = string(nanoid());

	name = string('');

	perDay = optionalMacro('');

	remaining = number(0);

	description = string('');

	recharge(this: SerdeProxy<Trait>) {
		this.remaining = this.perDay ?? 0;
	}
}
