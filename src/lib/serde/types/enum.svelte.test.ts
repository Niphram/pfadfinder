import { rand, randBoolean } from '@ngneat/falso';
import { describe, expect, it } from 'vitest';

import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL } from '$lib/serde';
import { expectErrResult, expectOkResult } from '$lib/test-utils';

import { enumeration, EnumWrapper } from './enum.svelte';

const VALUES = ['some', 'valid', 'values'] as const;
const randValue = () => rand(VALUES);

describe('EnumWrapper', () => {
	describe('enumeration factory', () => {
		it('should return instance of EnumWrapper', () => {
			const instance = enumeration(VALUES, randValue());

			expect(instance).toBeInstanceOf(EnumWrapper);
		});

		it('should set default options', () => {
			const instance = enumeration(VALUES, randValue());

			expect(instance.options).toStrictEqual({
				optional: false,
			});
		});
	});

	describe('result', () => {
		it('should return ok-result if all checks pass', () => {
			const instance = enumeration(VALUES, randValue());

			const result = instance.result();

			expectOkResult(result);
			expect(result.value).toBe(instance.value);
		});

		it('should return err-result if value null but options.optional is false', () => {
			const instance = enumeration(VALUES, null!, { optional: false });

			const result = instance.result();

			expectErrResult(result);
			expect(result.error).toBe('Value is required');
		});

		it('should return err-result if value is not in values', () => {
			const instance = enumeration(
				VALUES,
				'invalid' as (typeof VALUES)[number],
			);

			const result = instance.result();

			expectErrResult(result);
			expect(result.error).toBe('Value is invalid');
		});
	});

	describe('clone', () => {
		it('should return a new instance with the same state', () => {
			const instance = enumeration(VALUES, randValue(), {
				optional: randBoolean(),
			});

			const clone = instance.clone();

			expect(clone).not.toBe(instance);
			expect(clone.value).toBe(instance.value);
			expect(clone.values).toStrictEqual(instance.values);
			expect(clone.options).toStrictEqual(instance.options);
		});
	});

	describe('serialize', () => {
		it('should return the value', () => {
			const instance = enumeration(VALUES, randValue());

			const serialized = instance[SERIALIZE_SYMBOL]();

			expect(serialized).toBe(instance.value);
			expect(serialized).toBeTypeOf('string');
		});
	});

	describe('deserialize', () => {
		it('should replace value', () => {
			const instance = enumeration(VALUES, 'valid');

			instance[DESERIALIZE_SYMBOL]('values');

			expect(instance.value).toBe('values');
		});

		it('should accept null if options.optional is true', () => {
			const instance = enumeration(VALUES, 'valid', { optional: true });

			instance[DESERIALIZE_SYMBOL](null);

			expect(instance.value).toBeNull();
		});

		it('should validate against values', () => {
			const instance = enumeration(VALUES, 'valid');

			instance[DESERIALIZE_SYMBOL]('invalid');

			expect(instance.value).toBe('valid');
		});
	});
});
