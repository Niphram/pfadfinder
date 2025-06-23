import { describe, expect, test } from 'vitest';

import { RangedProperties } from './ranged-properties';

describe('RangedProperties', () => {
	test('should apply property to entire range', () => {
		const range = new RangedProperties<{ value: string }>(10);

		range.setProp('value', 'test', 0, 10);

		expect(range.spans).toHaveLength(1);
		expect(range.spans[0].props.value).toBe('test');
	});
});
