import { describe, expect, it } from 'vitest';
import { NodeType, parse } from './parser';

describe('Macro', () => {
	describe('Parser', () => {
		const TESTS: [input: string, output: NodeType][] = [
			['1', NodeType.Constant],
			['1234', NodeType.Constant],
			['@dex', NodeType.Attribute],
			['+1337', NodeType.Unary],
			['-42', NodeType.Unary],
			['2+3', NodeType.Binary],
			['floor(1)', NodeType.Func],
			['round(1)', NodeType.Func],
			['ceil(1)', NodeType.Func],
			['abs(1)', NodeType.Func],
			['min(1)', NodeType.Func],
			['min(1,2)', NodeType.Func],
			['max(1)', NodeType.Func],
			['max(1,2)', NodeType.Func],
			['clamp(1,2,3)', NodeType.Func],
			['(1234)', NodeType.Func]
		];

		for (const [input, output] of TESTS) {
			it(`parse "${input}"`, () => {
				const parsed = parse(input);

				expect(parsed.type).toEqual(output);
			});
		}

		const NEGATIVE_TESTS: string[] = [
			'',
			'Test',
			'*1',
			'/1',
			'%1',
			'2 a 3',
			'floor()',
			'round(1,2)',
			'ceil(1,2,3)',
			'abs(1,2,3,4)',
			'min()',
			'max()',
			'clamp(1,2)',
			'fake(1)'
		];

		for (const input of NEGATIVE_TESTS) {
			it(`fail "${input}"`, () => {
				const parsed = parse(input);

				expect(parsed.type).toBe(NodeType.Error);
			});
		}
	});
});
