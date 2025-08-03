import { randBoolean, randNumber, randText, toCollection } from '@ngneat/falso';
import { describe, expect, test } from 'vitest';

import { charProxy } from './proxy';
import { array, ArrayWrapper } from './types/array.svelte';
import { boolean } from './types/bool.svelte';
import { enumeration } from './types/enum.svelte';
import { number } from './types/number.svelte';
import { object, ObjectWrapper } from './types/object.svelte';
import { string } from './types/string.svelte';
import { derive } from './types/derive.svelte';
import { macro } from './types/macro.svelte';

class SubSubClass {
	foo = randNumber();
}

class SubClass {
	foo = randNumber();

	sub = object(new SubSubClass());
}

class TestClass {
	string = string(randText());

	number = number(randNumber());

	boolean = boolean(randBoolean());

	enumeration = enumeration(randText());

	array = array(() => randNumber(), []);

	subarray = array(() => new SubClass(), []);

	object = object(new SubClass());

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
			const text = randText();

			const sut = charProxy(new TestClass());
			sut.enumeration = text;

			expect(sut.enumeration).toBe(text);
		});

		test('ArrayWrapper', () => {
			const array = toCollection(randNumber);

			const sut = charProxy(new TestClass());
			sut.$array.value = array;

			expect(sut.array).toStrictEqual(array);
		});

		test('ArrayWrapper Object', () => {
			const array = toCollection(() => new SubClass());

			const sut = charProxy(new TestClass());
			sut.$subarray.value = array;

			expect(sut.subarray).toStrictEqual(array);
		});

		test('ObjectWrapper', () => {
			const object = new SubClass();

			const sut = charProxy(new TestClass());
			sut.$object.value = object;

			expect(sut.$object.value).toBe(object);
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

			expect(sut.$macro.expr).toBe('@number');
			expect(sut.macro).toBe(number);

			sut.$macro.expr = '@number * 3';

			expect(sut.$macro.expr).toBe('@number * 3');
			expect(sut.macro).toBe(number * 3);
		});
	});

	describe('$_ (unproxy)', () => {
		test('should return the wrapper object', () => {
			const sut = charProxy(new TestClass());

			expect(sut.array).toBeInstanceOf(Array);
			expect(sut.$array).toBeInstanceOf(ArrayWrapper);

			expect(sut.object).toBeInstanceOf(SubClass);
			expect(sut.$object).toBeInstanceOf(ObjectWrapper);

			expect(sut.object.sub).toBeInstanceOf(SubSubClass);
			expect(sut.object.$sub).toBeInstanceOf(ObjectWrapper);
		});
	});
});
