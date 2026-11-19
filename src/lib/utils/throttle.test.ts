import {
	afterAll,
	beforeAll,
	describe,
	expect,
	test,
	vi,
} from 'vite-plus/test';

import { awaited_throttle_re, throttle_fe } from './throttle';

describe('Throttle functions', () => {
	beforeAll(() => {
		vi.useFakeTimers();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	describe('throttle_fe', () => {
		test('should not invoke function before timeout', () => {
			const cb = vi.fn();

			const throttled = throttle_fe(cb, 100);
			throttled();

			expect(cb).not.toHaveBeenCalled();
		});

		test('should invoke function after timeout elapsed', () => {
			const cb = vi.fn();

			const throttled = throttle_fe(cb, 100);
			throttled();

			vi.advanceTimersToNextTimer();

			expect(cb).toHaveBeenCalled();
		});

		test('should invoke function with the last passed arguments', () => {
			const cb = vi.fn();

			const throttled = throttle_fe(cb, 100);
			throttled(1);
			throttled(2);
			throttled(3);

			vi.advanceTimersToNextTimer();

			expect(cb).toHaveBeenCalledWith(3);
		});
	});

	describe('awaited_throttle_re', () => {
		test('should immediately invoke function', () => {
			const cb = vi.fn(async () => {});

			const throttled = awaited_throttle_re(cb);
			throttled();

			expect(cb).toHaveBeenCalled();
		});

		test('should not invoke the function multiple times while the promise is pending', () => {
			const cb = vi.fn(async () => {});

			const throttled = awaited_throttle_re(cb);
			throttled();
			throttled();
			throttled();

			expect(cb).toHaveBeenCalledTimes(1);
		});

		test('should queue the last call while pending', async () => {
			const cb = vi.fn(async (_v: number) => {});

			const throttled = awaited_throttle_re(cb);
			throttled(1);
			throttled(2);
			throttled(3);

			await vi.runAllTimersAsync();

			expect(cb).toHaveBeenCalledTimes(2);
			expect(cb).toHaveBeenNthCalledWith(1, 1);
			expect(cb).toHaveBeenNthCalledWith(2, 3);
		});
	});
});
