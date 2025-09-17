import { describe, expect, test } from 'vitest';

import { AstNodeType } from './ast';
import { Parser } from './parser';

describe('Parser', () => {
	describe('Constants', () => {
		test.each([
			['0', 0],
			['1', 1],
			['123', 123],
			['0.0', 0],
			['0.123', 0.123],
		])(
			'should parse "%s" to a ConstantNode with value %d',
			(input, expected) => {
				const parseResult = Parser.parse(input);

				expect(parseResult.ok).toBe(true);
				expect(parseResult.value).toEqual({
					type: AstNodeType.Constant,
					constant: expected,
					from: 0,
					to: input.length,
				});
			},
		);
	});

	describe('Functions', () => {
		test.each([
			['floor(0)', 'floor', 1],
			['round(0)', 'round', 1],
			['ceil(0)', 'ceil', 1],
			['abs(0)', 'abs', 1],
			['min(0)', 'min', 1],
			['min(0,1)', 'min', 2],
			['min(0,1,2)', 'min', 3],
			['max(0)', 'max', 1],
			['max(0,1)', 'max', 2],
			['max(0,1,2)', 'max', 3],
			['clamp(0,1,2)', 'clamp', 3],
			['step(0,1)', 'step', 2],
		])(
			'should parse "%s" to a FuncNode of type "%s" with %d expressions',
			(input, func, args) => {
				const parsed = Parser.parse(input);

				expect(parsed.ok).toBe(true);
				expect(parsed.value).toEqual({
					type: AstNodeType.Func,
					func,
					nodes: expect.objectContaining({
						length: args,
					}),
					from: 0,
					to: input.length,
				});
			},
		);
	});

	describe('Whitespace', () => {
		test.each(['', ' ', '\t', '\n'])(
			'should return error when parsing %j',
			(input) => {
				const parsed = Parser.parse(input);

				expect(parsed.ok).toBe(false);
				expect(parsed.error).toEqual({
					message: 'Unexpected end of input, expected a valid expression.',
					from: 0,
					to: 0,
				});
			},
		);
	});
});
