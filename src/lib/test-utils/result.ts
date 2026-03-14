import { expect } from 'vitest';

import type { ErrResult, OkResult, Result } from '$lib/utils';

export function expectOkResult<T, E>(
	result: Result<T, E>,
): asserts result is OkResult<T> {
	expect(result.ok).toBe(true);
}

export function expectErrResult<T, E>(
	result: Result<T, E>,
): asserts result is ErrResult<E> {
	expect(result.ok).toBe(false);
}
