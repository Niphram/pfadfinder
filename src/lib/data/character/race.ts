import { autoserialize } from 'cerialize';

import { formula } from '../makros';
import type { SizeKey } from './combat';

export class Race {
	@autoserialize
	name = 'Unknown Race';

	@autoserialize
	speed = formula('30');

	@autoserialize
	size: SizeKey = 'medium';

	@autoserialize
	str = formula('0');

	@autoserialize
	dex = formula('0');

	@autoserialize
	con = formula('0');

	@autoserialize
	int = formula('0');

	@autoserialize
	wis = formula('0');

	@autoserialize
	cha = formula('0');
}
