import { derive, macro, string } from '$lib/serde';
import { Character } from './character';

export class Initiative {
	misc = macro('0');

	notes = string('');

	readonly mod = derive<Character>((c) => c.dex.mod + c.init.misc);
}
