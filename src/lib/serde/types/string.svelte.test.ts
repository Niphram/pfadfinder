import { randAlpha, randNumber } from '@ngneat/falso';
import { describe, expect, it } from 'vitest';

import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL } from '$lib/serde';
import { expectErrResult, expectOkResult } from '$lib/test-utils';

import { string, StringWrapper } from './string.svelte';

describe('StringWrapper', () => {
	describe('string factory', () => {
		it('should return instance of StringWrapper', () => {
			const instance = string(randAlpha());

			expect(instance).toBeInstanceOf(StringWrapper);
		});

		it('should set default options', () => {
			const instance = string(randAlpha());

			expect(instance.options).toStrictEqual({
				minLength: 0,
				maxLength: Infinity,
			});
		});
	});

	describe('result', () => {
		it('should return ok-result if all checks pass', () => {
			const instance = string(randAlpha());

			const result = instance.result();

			expectOkResult(result);
			expect(result.value).toBe(instance.value);
		});

		it('should return err-result if value is too short', () => {
			const instance = string('', { minLength: 5 });

			const result = instance.result();

			expectErrResult(result);
			expect(result.error).toBe('Length must be at least 5');
		});

		it('should return err-result if value is too long', () => {
			const instance = string('longer-string', { maxLength: 10 });

			const result = instance.result();

			expectErrResult(result);
			expect(result.error).toBe('Length must be at most 10');
		});
	});

	describe('clone', () => {
		it('should return a new instance with the same state', () => {
			const instance = string(randAlpha(), {
				minLength: randNumber(),
				maxLength: randNumber(),
			});

			const clone = instance.clone();

			expect(clone).not.toBe(instance);
			expect(clone.value).toBe(instance.value);
			expect(clone.options).toStrictEqual(instance.options);
		});
	});

	describe('serialize', () => {
		it('should return the value', () => {
			const instance = string(randAlpha());

			const serialized = instance[SERIALIZE_SYMBOL]();

			expect(serialized).toBe(instance.value);
			expect(serialized).toBeTypeOf('string');
		});
	});

	describe('deserialize', () => {
		it('should replace value', () => {
			const instance = string('foo');

			instance[DESERIALIZE_SYMBOL]('bar');

			expect(instance.value).toBe('bar');
		});

		it('should only accept strings', () => {
			const instance = string('foo');

			instance[DESERIALIZE_SYMBOL](15);

			expect(instance.value).toBe('foo');
		});
	});
});
