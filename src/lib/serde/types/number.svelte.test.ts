import { randBoolean, randNumber } from '@ngneat/falso';
import { describe, expect, it } from 'vitest';

import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL } from '$lib/serde';
import { expectErrResult, expectOkResult } from '$lib/test-utils';

import { number, NumberWrapper } from './number.svelte';

describe('NumberWrapper', () => {
	describe('number factory', () => {
		it('should return instance of NumberWrapper', () => {
			const instance = number(0);

			expect(instance).toBeInstanceOf(NumberWrapper);
		});

		it('should set default options', () => {
			const instance = number(0);

			expect(instance.options).toStrictEqual({
				optional: false,
				min: -Infinity,
				max: Infinity,
				integer: true,
			});
		});
	});

	describe('result', () => {
		it('should return ok-result if all checks pass', () => {
			const instance = number(randNumber());

			const result = instance.result();

			expectOkResult(result);
			expect(result.value).toBe(instance.value);
		});

		it('should return err-result if value is not a number', () => {
			const instance = number('string' as unknown as number);

			const result = instance.result();

			expectErrResult(result);
			expect(result.error).toBe('Not a number');
		});

		it('should return err-result if value is below options.min', () => {
			const instance = number(0, { min: 10 });

			const result = instance.result();

			expectErrResult(result);
			expect(result.error).toBe('Must be at least 10');
		});

		it('should return err-result if value is below options.max', () => {
			const instance = number(10, { max: 0 });

			const result = instance.result();

			expectErrResult(result);
			expect(result.error).toBe('Must be at most 0');
		});

		it('should return err-result options.integer is true but value is not an integer', () => {
			const instance = number(10.5, { integer: true });

			const result = instance.result();

			expectErrResult(result);
			expect(result.error).toBe('Must be an integer');
		});

		it('should return err-result if value is null but options.optional is false', () => {
			const instance = number(null!, { optional: false });

			const result = instance.result();

			expectErrResult(result);
			expect(result.error).toBe('Value is not valid');
		});
	});

	describe('clone', () => {
		it('should return a new instance with the same state', () => {
			const instance = number(randNumber(), {
				integer: randBoolean(),
				min: randNumber(),
				max: randNumber(),
				optional: randBoolean(),
			});

			const clone = instance.clone();

			expect(clone).not.toBe(instance);
			expect(clone.value).toBe(instance.value);
			expect(clone.options).toStrictEqual(instance.options);
		});
	});

	describe('serialize', () => {
		it('should return the value', () => {
			const instance = number(randNumber());

			const serialized = instance[SERIALIZE_SYMBOL]();

			expect(serialized).toBe(instance.value);
			expect(serialized).toBeTypeOf('number');
		});
	});

	describe('deserialize', () => {
		it('should replace value', () => {
			const instance = number(0);

			instance[DESERIALIZE_SYMBOL](10);

			expect(instance.value).toBe(10);
		});

		it('should only accept numbers', () => {
			const instance = number(0);

			instance[DESERIALIZE_SYMBOL]('string');

			expect(instance.value).toBe(0);
		});

		it('should only accept finite numbers', () => {
			const instance = number(0);

			instance[DESERIALIZE_SYMBOL](Infinity);

			expect(instance.value).toBe(0);
		});

		it('should allow null if options.optional is true', () => {
			const instance = number(0, { optional: true });

			instance[DESERIALIZE_SYMBOL](null);

			expect(instance.value).toBeNull();
		});

		it('should now allow null if options.optional is false', () => {
			const instance = number(0);

			instance[DESERIALIZE_SYMBOL](null);

			expect(instance.value).toBe(0);
		});
	});
});
