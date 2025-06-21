import { describe, expect, test } from 'vitest';

import { Parser } from './parser';
import { AstNodeType } from './ast';

describe('Parser', () => {
	describe('Constants', () => {
		test.each([
			['0', 0],
			['1', 1],
			['123', 123],
			['0.0', 0],
			['0.123', 0.123],
		])('should parse "%s" to a ConstantNode with value %d', (input, expected) => {
			const parser = Parser.parse(input);

			expect(parser).toEqual({
				type: AstNodeType.Constant,
				constant: expected,
			});
		});
	});

	describe('Whitespace', () => {
		test.each(['', ' ', '\t', '\n'])('should parse %j to "null"', (input) => {
			const parser = Parser.parse(input);

			expect(parser).toBeNull();
		});
	});
});
