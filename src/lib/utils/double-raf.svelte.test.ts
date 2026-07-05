import {
	afterAll,
	beforeAll,
	describe,
	expect,
	test,
	vi,
} from 'vite-plus/test';

import { rafraf } from './double-raf';

describe('rafraf', () => {
	beforeAll(() => {
		vi.useFakeTimers();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	test('should not invoke callback on same frame', () => {
		const cb = vi.fn();
		rafraf(cb);

		expect(cb).not.toHaveBeenCalled();
	});

	test('should not invoke callback on next frame', () => {
		const cb = vi.fn();
		rafraf(cb);

		vi.advanceTimersToNextFrame();

		expect(cb).not.toHaveBeenCalled();
	});

	test('should invoke callback after two frames', () => {
		const cb = vi.fn();
		rafraf(cb);

		vi.advanceTimersToNextFrame();
		vi.advanceTimersToNextFrame();

		expect(cb).toHaveBeenCalled();
	});
});
