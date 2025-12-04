import { describe, expect, test } from 'vitest';

import { Tokenizer, TokenType } from './tokenizer';

describe('Tokenizer', () => {
	test.each([
		['', []],
		['0', [TokenType.INTEGER]],
		['123', [TokenType.INTEGER]],
		['123.456', [TokenType.DECIMAL]],
		['abc', [TokenType.IDENTIFIER]],
		['abc123def', [TokenType.IDENTIFIER]],
		['+', [TokenType.OPERATOR]],
		['-', [TokenType.OPERATOR]],
		['*', [TokenType.OPERATOR]],
		['/', [TokenType.OPERATOR]],
		['%', [TokenType.OPERATOR]],
		['//', [TokenType.OPERATOR]],
		['**', [TokenType.OPERATOR]],
		['(', [TokenType.PARENTHESIS_LEFT]],
		[')', [TokenType.PARENTHESIS_RIGHT]],
		[',', [TokenType.COMMA]],
		['@', [TokenType.AT]],
		['.', [TokenType.PERIOD]],
		['123 + 456', [TokenType.INTEGER, TokenType.OPERATOR, TokenType.INTEGER]],
		[
			'@dex.mod',
			[
				TokenType.AT,
				TokenType.IDENTIFIER,
				TokenType.PERIOD,
				TokenType.IDENTIFIER,
			],
		],
		[';', [TokenType.INVALID]],
	])('"%s" should tokenize to "%s"', (input, tokens) => {
		const tokenizer = new Tokenizer(input);

		const result = tokenizer.allTokens();

		expect(result.map((t) => t.type)).toEqual(tokens);
	});
});
