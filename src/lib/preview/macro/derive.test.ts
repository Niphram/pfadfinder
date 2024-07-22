import { describe, expect, it, vi } from 'vitest';

import { Derive } from './derive';

describe('Derive.eval', () => {
	it('should call callback with character', () => {
		const char = vi.fn();
		const cb = vi.fn();

		new Derive(cb).eval(char);

		expect(cb).toHaveBeenCalledWith(char);
	});

	it('should return callback result', () => {
		const char = vi.fn();
		const cb = vi.fn();

		expect(new Derive(cb).eval(char)).toBe(cb());
	});
});
