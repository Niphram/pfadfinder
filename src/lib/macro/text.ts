import type { SerdeProxy } from '$lib/serde/proxy';

import type { Character } from '$lib/data';

import { evalNode } from './evaluate';
import { Parser } from './parser';

const MACRO = /{{(.*?)}}/g;

export function parseTextWithMacros(input: string, char: SerdeProxy<Character>): string {
	const parsed = input.replaceAll(MACRO, (match) => {
		const macro = match.substring(2, match.length - 2);

		// Macro has formatting options
		if (macro.startsWith(':')) {
			const split = macro.indexOf(' ');
			const format = macro.substring(1, split);

			const parseResult = Parser.parse(macro.substring(split));
			if (!parseResult.ok) return '[Parse Error]';

			const result = evalNode(parseResult.value, char);

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
			const parseResult = Parser.parse(macro);
			if (!parseResult.ok) return '[Parse Error]';

			const result = evalNode(parseResult.value, char);

			return `[${result.toString()}]`;
		}
	});

	return parsed;
}
