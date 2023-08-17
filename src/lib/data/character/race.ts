import { autoserialize } from 'cerialize';

import { Macro, macro } from '../macros';
import type { SizeKey } from './combat';

export class Race {
	@autoserialize
	name = 'Unknown Race';

	@macro
	speed = new Macro('30');

	@autoserialize
	size: SizeKey = 'medium';

	@macro
	str = new Macro('0');

	@macro
	dex = new Macro('0');

	@macro
	con = new Macro('0');

	@macro
	int = new Macro('0');

	@macro
	wis = new Macro('0');

	@macro
	cha = new Macro('0');
}
