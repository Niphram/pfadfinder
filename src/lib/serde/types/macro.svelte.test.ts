import { randBoolean, randNumber } from '@ngneat/falso';
import { describe, expect, it } from 'vitest';

import { DESERIALIZE_SYMBOL, SERIALIZE_SYMBOL } from '$lib/serde';
import { expectErrResult, expectOkResult } from '$lib/test-utils';

import { Macro, macro } from './macro.svelte';

describe('Macro', () => {
	describe('macro factory', () => {
		it('should return instance of EnumWrapper', () => {
			const instance = macro('');

			expect(instance).toBeInstanceOf(Macro);
		});

		it('should set default options', () => {
			const instance = macro('');

			expect(instance.options).toStrictEqual({
				optional: false,
				integer: true,
				min: -Infinity,
				max: Infinity,
			});
		});
	});

	describe('parseResult', () => {
		it('should update whenever expr changes', () => {
			const instance = macro('10');

			expectOkResult(instance.parseResult);

			instance.expr = '10 +';

			expectErrResult(instance.parseResult);
		});
	});

	describe('eval', () => {
		it('should return the evaluated value', () => {
			const instance = macro('7 + 3');

			const value = instance.eval({});

			expect(value).toBe(10);
		});

		it('should return NaN if the result is invalid', () => {
			const instance = macro('7 +');

			const value = instance.eval({});

			expect(value).toBeNaN();
		});
	});

	describe('result', () => {
		it('should return an ok-result if all checks pass', () => {
			const instance = macro('7 + 3');

			const result = instance.result({});

			expectOkResult(result);
			expect(result.value).toBe(10);
		});

		it('should return an ok-result expression is only whitespace but options.optional is true', () => {
			const instance = macro(' \t\n', { optional: true });

			const result = instance.result({});

			expectOkResult(result);
			expect(result.value).toBeNull();
		});

		it('should return the parser error if the expression could not be parsed', () => {
			const instance = macro('5+');

			const result = instance.result({});

			expectErrResult(result);
			expect(result.error).toStrictEqual({
				from: 0,
				to: 0,
				message: 'Unexpected end of input, expected a valid expression.',
			});
		});

		it('should return error if the value is not an integer and options.integer is false', () => {
			const instance = macro('5/2');

			const result = instance.result({});

			expectErrResult(result);
			expect(result.error).toStrictEqual({
				from: 0,
				to: 0,
				message: 'Value must be an integer (is 2.5)',
			});
		});

		it('should return error if the value is below options.min', () => {
			const instance = macro('-5', { min: 0 });

			const result = instance.result({});

			expectErrResult(result);
			expect(result.error).toStrictEqual({
				from: 0,
				to: 0,
				message: 'Value must not be lower than 0 (is -5)',
			});
		});

		it('should return error if the value is not an integer and options.integer is false', () => {
			const instance = macro('10', { max: 0 });

			const result = instance.result({});

			expectErrResult(result);
			expect(result.error).toStrictEqual({
				from: 0,
				to: 0,
				message: 'Value must not be greater than 0 (is 10)',
			});
		});
	});

	describe('clone', () => {
		it('should return a new instance with the same state', () => {
			const instance = macro(`${randNumber()}`, {
				optional: randBoolean(),
				integer: randBoolean(),
				min: randNumber(),
				max: randNumber(),
			});

			const clone = instance.clone();

			expect(clone).not.toBe(instance);
			expect(clone.expr).toBe(instance.expr);
			expect(clone.options).toStrictEqual(instance.options);
		});
	});

	describe('serialize', () => {
		it('should return the expression', () => {
			const instance = macro(`${randNumber()}`);

			const serialized = instance[SERIALIZE_SYMBOL]();

			expect(serialized).toBe(instance.expr);
			expect(serialized).toBeTypeOf('string');
		});
	});

	describe('deserialize', () => {
		it('should replace expression', () => {
			const instance = macro('0');

			instance[DESERIALIZE_SYMBOL]('10');

			expect(instance.expr).toBe('10');
		});

		it('should only accept strings', () => {
			const instance = macro('0');

			instance[DESERIALIZE_SYMBOL](15);

			expect(instance.expr).toBe('0');
		});
	});
});
