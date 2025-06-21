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
		['(', [TokenType.PARENTHESIS_LEFT]],
		[')', [TokenType.PARENTHESIS_RIGHT]],
		[',', [TokenType.COMMA]],
		['@', [TokenType.AT]],
		['.', [TokenType.PERIOD]],
		['123 + 456', [TokenType.INTEGER, TokenType.OPERATOR, TokenType.INTEGER]],
		['@dex.mod', [TokenType.AT, TokenType.IDENTIFIER, TokenType.PERIOD, TokenType.IDENTIFIER]],
	])('"%s" should tokenize to "%s"', (input, tokens) => {
		const tokenizer = new Tokenizer(input);

		for (const token of tokens) {
			expect(tokenizer.hasMoreTokens()).toBe(true);
			expect(tokenizer.getNextToken()?.type).toBe(token);
		}

		// Make sure no tokens remain
		expect(tokenizer.hasMoreTokens()).toBe(false);
		expect(tokenizer.getNextToken()).toBeNull();
	});

	test.each([';', '='])('"%s" should fail tokenization', (input) => {
		const tokenizer = new Tokenizer(input);

		expect(tokenizer.hasMoreTokens()).toBe(true);
		expect(() => tokenizer.getNextToken()).throws();
	});
});
