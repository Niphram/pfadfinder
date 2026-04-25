import { describe, expect, it } from 'vitest';

import { isIn, mapMax, mapMin, mapSum } from './array';

describe('array utils', () => {
	describe('mapSum', () => {
		it('should sum the result of the mapped values', () => {
			const arr = [1, 2, 3, 4, 5];

			const res = mapSum(arr, (v) => v); // Every element produces itself

			expect(res).toBe(15);
		});

		it('empty arrays should result in 0', () => {
			const arr: number[] = [];

			const res = mapSum(arr, (v) => v);

			expect(res).toBe(0);
		});
	});

	describe('mapMin', () => {
		it('should return the the lowest value', () => {
			const arr = ['some', 'words', 'of', 'differing', 'length'];

			const res = mapMin(arr, (v) => v.length);

			expect(res).toBe(2); // "of"
		});

		it('empty arrays should result in undefined', () => {
			const arr: string[] = [];

			const res = mapMin(arr, (v) => v.length);

			expect(res).toBeUndefined();
		});
	});

	describe('mapMax', () => {
		it('should return the the highest value', () => {
			const arr = ['some', 'words', 'of', 'differing', 'length'];

			const res = mapMax(arr, (v) => v.length);

			expect(res).toBe(9); // "differing"
		});

		it('empty arrays should result in undefined', () => {
			const arr: string[] = [];

			const res = mapMax(arr, (v) => v.length);

			expect(res).toBeUndefined();
		});
	});

	describe('isIn', () => {
		it('should return true, if the array contains the element', () => {
			const arr = ['some', 'words', 'of', 'differing', 'length'] as const;

			const res = isIn(arr, 'words');

			expect(res).toBe(true);
		});

		it('should return false, if the array does not contain the element', () => {
			const arr = ['some', 'words', 'of', 'differing', 'length'] as const;

			const res = isIn(arr, 'foo');

			expect(res).toBe(false);
		});
	});
});
