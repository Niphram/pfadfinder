import { describe, expect, test, vi } from 'vitest';

import { observeMutations } from './mutation-observer';

describe('observeMutations', () => {
	test('should invoke callback on [[Set]]', () => {
		const obj = { foo: 1 };
		const cb = vi.fn();
		const proxy = observeMutations(obj, cb);

		proxy.foo = 5;

		expect(cb).toHaveBeenCalledExactlyOnceWith(obj);
	});

	test('should invoke callback on deeply nested [[Set]]', () => {
		const obj = { foo: { bar: 1 } };
		const cb = vi.fn();
		const proxy = observeMutations(obj, cb);

		proxy.foo.bar = 5;

		expect(cb).toHaveBeenCalledExactlyOnceWith(obj);
	});
});
