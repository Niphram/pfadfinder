import { randBoolean } from '@ngneat/falso';
import { describe, expect, it } from 'vitest';

import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL } from '$lib/serde';

import { boolean, BoolWrapper } from './bool.svelte';

describe('BoolWrapper', () => {
	describe('boolean factory', () => {
		it('should create BoolWrapper instance', () => {
			const instance = boolean(randBoolean());

			expect(instance).toBeInstanceOf(BoolWrapper);
		});
	});

	describe('serialize', () => {
		it('should return value', () => {
			const instance = boolean(randBoolean());

			const serialized = instance[SERIALIZE_SYMBOL]();

			expect(serialized).toBe(instance.value);
		});
	});

	describe('deserialize', () => {
		it('should replace value', () => {
			const instance = boolean(false);

			instance[DESERIALIZE_SYMBOL](true);

			expect(instance.value).toBe(true);
		});

		it('should only accept booleans', () => {
			const instance = boolean(false);

			instance[DESERIALIZE_SYMBOL]('string');

			expect(instance.value).toBe(false);
		});
	});
});
