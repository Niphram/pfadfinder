import { describe, expect, it } from 'vitest';

import { withSign } from './format';

describe('withSign', () => {
	it('should format positive numbers', () => {
		expect(withSign(1)).toBe('+1');
	});

	it('should format 0', () => {
		expect(withSign(0)).toBe('0');
	});

	it('should format negative numbers', () => {
		expect(withSign(-1)).toBe('-1');
	});
});
