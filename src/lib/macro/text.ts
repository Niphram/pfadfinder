import type { Character } from '$lib/data';
import type { CharProxy } from '$lib/serde/proxy';

import { evalNode } from './evaluate';
import { Parser } from './parser';

const MACRO = /{{(.*?)}}/g;

export function parseTextWithMacros(input: string, char: CharProxy<Character>): string {
	const parsed = input.replaceAll(MACRO, (match) => {
		const macro = match.substring(2, match.length - 2);

		// Macro has formatting options
		if (macro.startsWith(':')) {
			const split = macro.indexOf(' ');
			const format = macro.substring(1, split);
			const result = evalNode(Parser.parse(macro.substring(split)), char);

			const signed = format.includes('+');
			const hideZero = format.includes('z');

			if (hideZero && result === 0) {
				return '';
			}

			if (signed) {
				return result >= 0 ? `+${result}` : `${result}`;
			}

			return `${result}`;
		} else {
			return `[${evalNode(Parser.parse(macro), char).toString()}]`;
		}
	});

	return parsed;
}
