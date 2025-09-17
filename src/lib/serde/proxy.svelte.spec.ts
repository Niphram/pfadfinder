import {
	rand,
	randBoolean,
	randNumber,
	randText,
	toCollection,
} from '@ngneat/falso';
import { describe, expect, test } from 'vitest';

import { ClassSerializer } from './class-serializer';
import { charProxy } from './proxy';
import { array, ArrayWrapper } from './types/array.svelte';
import { boolean } from './types/bool.svelte';
import { derive } from './types/derive.svelte';
import { enumeration } from './types/enum.svelte';
import { macro } from './types/macro.svelte';
import { number } from './types/number.svelte';
import { string } from './types/string.svelte';

class SubSubClass extends ClassSerializer {
	foo = randNumber();
}

class SubClass extends ClassSerializer {
	foo = randNumber();

	sub = new SubSubClass();
}

const ENUM_EXAMPLE = ['a', 'b', 'c'] as const;

class TestClass extends ClassSerializer {
	string = string(randText());

	number = number(randNumber());

	boolean = boolean(randBoolean());

	enumeration = enumeration(ENUM_EXAMPLE, rand(ENUM_EXAMPLE));

	optionalEnumeration = enumeration(ENUM_EXAMPLE, rand(ENUM_EXAMPLE), {
		optional: true,
	});

	array = array(() => number(randNumber()), []);

	subarray = array(() => new SubClass(), []);

	object = new SubClass();

	derive = derive<TestClass>((c) => c.number);

	macro = macro('@number');
}

describe('Proxy', () => {
	describe('Special objects', () => {
		test('StringWrapper', () => {
			const text = randText();

			const sut = charProxy(new TestClass());
			sut.string = text;

			expect(sut.string).toBe(text);
		});

		test('NumberWrapper', () => {
			const number = randNumber();

			const sut = charProxy(new TestClass());
			sut.number = number;

			expect(sut.number).toBe(number);
		});

		test('BoolWrapper', () => {
			const boolean = randBoolean();

			const sut = charProxy(new TestClass());
			sut.boolean = boolean;

			expect(sut.boolean).toBe(boolean);
		});

		test('EnumWrapper', () => {
			const text = rand(ENUM_EXAMPLE);

			const sut = charProxy(new TestClass());
			sut.enumeration = text;

			expect(sut.enumeration).toBe(text);
		});

		test('optional EnumWrapper', () => {
			const sut = charProxy(new TestClass());
			sut.optionalEnumeration = null;

			expect(sut.optionalEnumeration).toBeNull();
		});

		test('ArrayWrapper', () => {
			const array = toCollection(() => number(randNumber()));

			const sut = charProxy(new TestClass());
			sut.$.array.value = array;

			expect(sut.array).toStrictEqual(array.map((c) => c.value));
			expect(sut.$.array.value).toStrictEqual(array);
		});

		test('ArrayWrapper Object', () => {
			const array = toCollection(() => new SubClass());

			const sut = charProxy(new TestClass());
			sut.$.subarray.value = array;

			expect(sut.subarray).toStrictEqual(array);
		});

		test('Derive', () => {
			const number = randNumber();

			const sut = charProxy(new TestClass());
			sut.number = number;

			expect(sut.derive).toBe(number);
		});

		test('Macro', () => {
			const number = randNumber();

			const sut = charProxy(new TestClass());
			sut.number = number;

			expect(sut.$.macro.expr).toBe('@number');
			expect(sut.macro).toBe(number);

			sut.$.macro.expr = '@number * 3';

			expect(sut.$.macro.expr).toBe('@number * 3');
			expect(sut.macro).toBe(number * 3);
		});
	});

	describe('$_ (unproxy)', () => {
		test('should return the wrapper object', () => {
			const sut = charProxy(new TestClass());

			expect(sut.array).toBeInstanceOf(Array);
			expect(sut.$.array).toBeInstanceOf(ArrayWrapper);
		});
	});
});
