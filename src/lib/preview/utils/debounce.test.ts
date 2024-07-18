import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { debounce } from './debounce';

describe('debounce', () => {
	vi.useFakeTimers();

	beforeAll(() => {
		vi.useFakeTimers();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it('should not call the callback before the time elapses', () => {
		const testFn = vi.fn(() => 0);

		const debounceTest = debounce(testFn, 1000);

		debounceTest();

		expect(testFn).not.toHaveBeenCalled();
	});

	it('should call the callback after the timeout', () => {
		const testFn = vi.fn(() => 0);

		const debounceTest = debounce(testFn, 1000);

		debounceTest();
		expect(testFn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1000);

		debounceTest();
		expect(testFn).toHaveBeenCalled();
	});

	it('should reset the timeout with every call', () => {
		const testFn = vi.fn(() => 0);

		const debounceTest = debounce(testFn, 1000);

		for (let i = 0; i < 10; i++) {
			debounceTest();
			vi.advanceTimersByTime(500);
		}

		expect(testFn).not.toHaveBeenCalled();
	});

	it('should call the callback with the last arguments', () => {
		const testFn = vi.fn((arg: number) => arg);

		const debounceTest = debounce(testFn, 1000);

		debounceTest(1);
		debounceTest(2);

		vi.advanceTimersByTime(1000);

		expect(testFn).toHaveBeenCalledWith(2);
	});
});
