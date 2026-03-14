import { describe, expect, it, vi } from 'vitest';

import { Derive, derive } from './derive.svelte';

describe('Derive', () => {
	describe('derive factory', () => {
		it('should return instance of Derive', () => {
			const instance = derive(vi.fn());

			expect(instance).toBeInstanceOf(Derive);
		});
	});

	describe('eval', () => {
		it('should invoke the callback and return its value', () => {
			const fn = vi.fn().mockReturnValue({});
			const char = {};
			const instance = derive(fn);

			const evaluated = instance.eval(char);

			expect(evaluated).toBe(fn());
			expect(fn).toHaveBeenCalledWith(char);
		});
	});
});
