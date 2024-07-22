import { describe, expect, it } from 'vitest';

import { TokenKind, tokenize } from './tokenizer';

describe('Macro', () => {
	describe('Tokenizer', () => {
		const TESTS: [input: string, kind: TokenKind | undefined][] = [
			['1', TokenKind.Number],
			['1234567890', TokenKind.Number],
			['A', TokenKind.String],
			['LongerStringWithMixedCase', TokenKind.String],
			['+', TokenKind.Op],
			['-', TokenKind.Op],
			['*', TokenKind.Op],
			['/', TokenKind.Op],
			['%', TokenKind.Op],
			[',', TokenKind.Comma],
			['@', TokenKind.At],
			['(', TokenKind.LParen],
			[')', TokenKind.RParen],
			['.', TokenKind.Period]
		];

		for (const [input, kind] of TESTS) {
			it(`Tokenize "${input}"`, () => {
				const token = tokenize(input);

				expect(token?.kind).toBe(kind);
				expect(token?.next).toBeUndefined();
				expect(token?.text).toBe(input);
			});
		}

		it('Should ignore spaces', () => {
			expect(tokenize('     ')).toBeUndefined();
		});

		it('Should tokenize empty string', () => {
			expect(tokenize('')).toBeUndefined();
		});
	});
});
