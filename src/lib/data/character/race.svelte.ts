import { enumeration, macro, string } from '$lib/serde';
import { ClassSerializer } from '$lib/serde/class-serializer';

import type { SizeKey } from './combat.svelte';

export class Race extends ClassSerializer {
	name = string('Unknown Race');

	speed = macro('30');

	size = enumeration<SizeKey>('medium');

	str = macro('0');

	dex = macro('0');

	con = macro('0');

	int = macro('0');

	wis = macro('0');

	cha = macro('0');
}
