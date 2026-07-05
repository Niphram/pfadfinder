import { describe, expect, test, vi } from 'vite-plus/test';

import { preventDefault, stopPropagation } from './event-modifiers';

describe('Event modifiers', () => {
	describe('preventDefault', () => {
		test('should call .preventDefault on event and invoke callback', () => {
			const cb = vi.fn();
			const eventMock = {
				preventDefault: vi.fn(),
			};

			const sut = preventDefault(cb);
			sut(eventMock, 'additional-params');

			expect(eventMock.preventDefault).toHaveBeenCalled();
			expect(cb).toHaveBeenCalledWith(eventMock, 'additional-params');
		});
	});

	describe('stopPropagation', () => {
		test('should call .stopPropagation on event and invoke callback', () => {
			const cb = vi.fn();
			const eventMock = {
				stopPropagation: vi.fn(),
			};

			const sut = stopPropagation(cb);
			sut(eventMock, 'additional-params');

			expect(eventMock.stopPropagation).toHaveBeenCalled();
			expect(cb).toHaveBeenCalledWith(eventMock, 'additional-params');
		});
	});
});
