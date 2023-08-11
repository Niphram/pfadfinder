import type { ICharacter } from '$lib/state';
import { calculateNode } from './evaluate';
import { parse } from './parser';

const MACRO = /{{(.*?)}}/g;

export function parseTextWithMacros(input: string, char: ICharacter): string {
	const parsed = input.replaceAll(
		MACRO,
		(match) => `[${calculateNode(parse(match.substring(2, match.length - 2)), char).toString()}]`
	);

	return parsed;
}
