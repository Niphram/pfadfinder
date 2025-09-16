import type { ParserError, RuntimeError } from '$lib/macro/errors';
import { Tokenizer, TokenType } from '$lib/macro/tokenizer';

import type { RichInputTextProperties } from '$lib/components/input/rich-input.svelte';

import { RangedProperties } from './ranged-properties';

export function computeMacroStyle(input: string) {
	const tokens = new Tokenizer(input).allTokens();

	const textStyle = new RangedProperties<RichInputTextProperties>(input.length);

	for (const token of tokens) {
		const applyStyle = <P extends keyof RichInputTextProperties>(
			prop: P,
			value: RichInputTextProperties[P],
		) => {
			textStyle.setProp(prop, value, token.from, token.to - token.from);
		};

		switch (token.type) {
			case TokenType.INTEGER:
			case TokenType.DECIMAL:
			case TokenType.PARENTHESIS_LEFT:
			case TokenType.PARENTHESIS_RIGHT:
			case TokenType.COMMA:
				break;

			case TokenType.AT:
			case TokenType.PERIOD:
				applyStyle('color', 'var(--color-warning)');
				break;

			case TokenType.IDENTIFIER:
				applyStyle('color', 'var(--color-info)');
				break;

			case TokenType.OPERATOR:
				applyStyle('color', 'var(--color-success)');
				break;

			case TokenType.INVALID:
				applyStyle('color', 'var(--color-error)');
				applyStyle('decoration', 'underline var(--color-error) wavy');
				break;
		}
	}

	return textStyle;
}

export function computeMacroStyleWithError(error?: ParserError | RuntimeError) {
	return (input: string) => {
		const style = computeMacroStyle(input);

		if (error) {
			const end = error.to - error.from;
			style.setProp('color', 'var(--color-error)', error.from, end);
			style.setProp('decoration', 'underline var(--color-error) wavy', error.from, end);
		}

		return style;
	};
}

export function computeMacroInTextStyle(input: string) {
	const textStyle = new RangedProperties<RichInputTextProperties>(input.length);

	const MACRO = /{{(.*?)}}/g;
	for (const match of input.matchAll(MACRO)) {
		const content = match[1];

		let subTextStyle: RangedProperties<RichInputTextProperties>;
		let offset = 0;

		if (content.startsWith(':')) {
			offset = content.indexOf(' ');
			const result = content.substring(offset);
			subTextStyle = computeMacroStyle(result);
		} else {
			subTextStyle = computeMacroStyle(content);
		}

		textStyle.setProp('color', 'var(--color-secondary)', match.index, offset + 2);
		textStyle.setProp('color', 'var(--color-secondary)', match.index + match[0].length - 2, 2);

		textStyle.add(subTextStyle, match.index + 2 + offset);
	}

	return textStyle;
}
