import type { Character } from '$lib/data';
import { calculateNode } from './evaluate';
import { parse } from './parser';

const MACRO = /{{(.*?)}}/g;

export function parseTextWithMacros(input: string, char: Character): string {
	const parsed = input.replaceAll(MACRO, (match) => {
		const macro = match.substring(2, match.length - 2);

		// Macro has formatting options
		if (macro.startsWith(':')) {
			const split = macro.indexOf(' ');
			const format = macro.substring(1, split);
			const result = calculateNode(parse(macro.substring(split)), char);

			const signed = format.at(0) === '+';

			if (signed) {
				return result < 0 ? result.toString() : `+${result}`;
			} else {
				return result.toString();
			}
		} else {
			return `[${calculateNode(parse(macro), char).toString()}]`;
		}
	});

	return parsed;
}
