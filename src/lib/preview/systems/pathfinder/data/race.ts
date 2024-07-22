import { autoserialize } from 'cerialize';

import { Macro, serializeMacro } from '$lib/preview/macro/macro';

export const SIZE_KEYS = [
	'fine',
	'diminutive',
	'tiny',
	'small',
	'medium',
	'large',
	'huge',
	'gargantuan',
	'colossal'
];
export type SizeKey = (typeof SIZE_KEYS)[number];

export class Race {
	@autoserialize
	name = 'Unknown Race';

	@serializeMacro
	speed = new Macro('30');

	@autoserialize
	size: SizeKey = 'medium';

	@serializeMacro
	str = new Macro('0');

	@serializeMacro
	dex = new Macro('0');

	@serializeMacro
	con = new Macro('0');

	@serializeMacro
	int = new Macro('0');

	@serializeMacro
	wis = new Macro('0');

	@serializeMacro
	cha = new Macro('0');
}
