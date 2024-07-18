import { describe, expect, it, vi } from 'vitest';

import { lazy } from './lazy';

describe('lazy', () => {
	it('should only call the callback once', () => {
		const testFn = vi.fn(() => 0);

		const lazyTest = lazy(testFn);

		lazyTest();
		lazyTest();

		expect(testFn).toHaveBeenCalledOnce();
	});

	it('should return the same value each time', () => {
		const testVal = {};
		const testFn = vi.fn(() => testVal);

		const lazyTest = lazy(testFn);

		expect(lazyTest()).toBe(testVal);
		expect(lazyTest()).toBe(testVal);
	});

	it('should only invoke the callback once called', () => {
		const testFn = vi.fn(() => 0);

		const lazyTest = lazy(testFn);

		expect(testFn).not.toHaveBeenCalled();

		lazyTest();

		expect(testFn).toHaveBeenCalledOnce();
	});
});
