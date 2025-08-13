import { nanoid } from 'nanoid';

import { macro, number, string } from '$lib/serde';
import type { CharProxy } from '$lib/serde/proxy';
import { ClassSerializer } from '$lib/serde/class-serializer';

export class Trait extends ClassSerializer {
	id = string(nanoid());

	name = string('');

	perDay = macro('');

	remaining = number(0);

	description = string('');

	recharge(this: CharProxy<Trait>) {
		if (this.$perDay.expr !== '') {
			this.remaining = this.perDay;
		}
	}
}
