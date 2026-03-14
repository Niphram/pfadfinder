import { randNumber, toCollection } from '@ngneat/falso';
import { describe, expect, it, vi } from 'vitest';

import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL } from '$lib/serde';

import { array, ArrayWrapper } from './array.svelte';
import { number } from './number.svelte';

const factory = () => number(0);
const genValues = (length = 10) =>
	toCollection(() => number(randNumber()), { length });

describe('ArrayWrapper', () => {
	describe('array factory', () => {
		it('should return instance of ArrayWrapper', () => {
			const instance = array(factory);

			expect(instance).toBeInstanceOf(ArrayWrapper);
		});

		it('should set value', () => {
			const values = genValues();
			const instance = array(factory, values);

			expect(instance).toBeInstanceOf(ArrayWrapper);
			expect(instance.value).toEqual(values);
		});

		it('should default to empty array', () => {
			const instance = array(vi.fn());

			expect(instance).toBeInstanceOf(ArrayWrapper);
			expect(instance.value).toHaveLength(0);
		});
	});

	describe('serialize', () => {
		it('should serialize all elements and return them as array', () => {
			const values = genValues();
			const instance = array(factory, values);

			const serialized = instance[SERIALIZE_SYMBOL]();

			expect(serialized).toHaveLength(values.length);
			expect(serialized).toEqual(values.map((v) => v.value));
		});
	});

	describe('deserialize', () => {
		it('should replace all elements with the deserialized elements', () => {
			const instance = array(factory, genValues(10));

			instance[DESERIALIZE_SYMBOL]([1, 2, 3, 4, 5]);

			expect(instance.value).toHaveLength(5);
			expect(instance.value).toEqual([
				number(1),
				number(2),
				number(3),
				number(4),
				number(5),
			]);
		});
	});
});
