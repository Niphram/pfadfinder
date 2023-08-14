import type { Character } from '$lib/data';
import { calculateNode } from './evaluate';
import { parse } from './parser';

const MACRO = /{{(.*?)}}/g;

export function parseTextWithMacros(input: string, char: Character): string {
	const parsed = input.replaceAll(
		MACRO,
		(match) => `[${calculateNode(parse(match.substring(2, match.length - 2)), char).toString()}]`
	);

	return parsed;
}
