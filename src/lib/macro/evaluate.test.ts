import { describe, expect, test } from 'vitest';

import { evalNode } from './evaluate';
import { Parser } from './parser';

describe('evaluateNode', () => {
	test.each([
		['', NaN],
		['123', 123],
		['123 - 100', 23],
		['1 + 2 * 3', 7],
		['1 * (2 + 3)', 5],
	])('"%s" should evaluate to %s', (input, expected) => {
		const ast = Parser.parse(input);
		const result = evalNode(ast, {});

		expect(result).toBe(expected);
	});

	describe('Functions', () => {
		test.each([
			['floor(0.9)', 0],
			['ceil(0.1)', 1],
			['round(0.49)', 0],
			['round(0.5)', 1],
			['min(1, 2, 3)', 1],
			['max(1, 2, 3)', 3],
			['clamp(0, 5, 10)', 5],
			['clamp(20, 5, 10)', 10],
			['clamp(7, 5, 10)', 7],
			['step(0, 5)', 0],
			['step(10, 5)', 1],
		])('"%s" should evaluate to %s', (input, expected) => {
			const ast = Parser.parse(input);
			const result = evalNode(ast, {});

			expect(result).toBe(expected);
		});
	});

	class TestChar {
		nested = {
			foo: 1,
		};
		array = [2, 3, 4];
	}

	describe('Attributes', () => {
		test.each([
			['@nested.foo', 1],
			['@array.1', 3],
		])('Attribute "%s" should evaluate to %s', (input, expected) => {
			const ast = Parser.parse(input);
			const result = evalNode(ast, new TestChar());

			expect(result).toBe(expected);
		});
	});
});
