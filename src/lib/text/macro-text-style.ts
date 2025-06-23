import type { RichInputTextProperties } from '$lib/components/input/rich-input.svelte';
import { Tokenizer, TokenType } from '$lib/macro/tokenizer';

import { RangedProperties } from './ranged-properties';

export function computeMacroStyle(input: string) {
	const tokens = new Tokenizer(input).allTokens();

	const textStyle = new RangedProperties<RichInputTextProperties>(input.length);

	for (const token of tokens) {
		const applyStyle = <P extends keyof RichInputTextProperties>(
			prop: P,
			value: RichInputTextProperties[P],
		) => {
			textStyle.setProp(prop, value, token.start, token.end - token.start);
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
