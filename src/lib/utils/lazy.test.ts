import { describe, expect, it, vi } from 'vitest';

import { lazy } from './lazy';

describe('lazy', () => {
	it('should always return same result', () => {
		const sut = lazy(() => ({}));

		expect(sut()).toBe(sut());
	});

	it('should not invoke callback until called', () => {
		const cb = vi.fn(() => ({}));
		const sut = lazy(cb);

		expect(cb).not.toHaveBeenCalled();

		sut();

		expect(cb).toHaveBeenCalled();
	});

	it('should only invoke callback once', () => {
		const cb = vi.fn(() => ({}));
		const sut = lazy(cb);

		sut();
		sut();

		expect(cb).toHaveBeenCalledOnce();
	});
});
