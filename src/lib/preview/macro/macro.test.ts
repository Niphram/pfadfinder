import { describe, expect, it } from 'vitest';

import { Macro } from './macro';

describe('Macro', () => {
	describe('eval', () => {
		it('should return result if expression is valid', () => {
			const macro = new Macro('5 + @dex');

			expect(macro.eval({ dex: 10 })).toBe(15);
		});

		it('should return NaN if expression is invalid', () => {
			const macro = new Macro('5 + @dex');

			expect(macro.eval({})).toBe(NaN);
		});
	});
});
