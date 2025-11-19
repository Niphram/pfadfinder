import { ClassSerializer, number, string } from '$lib/serde';

export class Money extends ClassSerializer {
	pp = number(0, { min: 0 });

	gp = number(0, { min: 0 });

	sp = number(0, { min: 0 });

	cp = number(0, { min: 0 });

	notes = string('', { maxLength: 1000 });
}
