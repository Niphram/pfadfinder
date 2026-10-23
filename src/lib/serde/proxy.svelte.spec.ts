import { faker } from '@faker-js/faker';
import { describe, expect, test } from 'vite-plus/test';

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
	foo = faker.number.int();
}

class SubClass extends ClassSerializer {
	foo = faker.number.int();

	sub = new SubSubClass();
}

const ENUM_EXAMPLE = ['a', 'b', 'c'] as const;

class TestClass extends ClassSerializer {
	string = string(faker.string.sample());

	number = number(faker.number.int());

	boolean = boolean(faker.datatype.boolean());

	enumeration = enumeration(
		ENUM_EXAMPLE,
		faker.helpers.arrayElement(ENUM_EXAMPLE),
	);

	optionalEnumeration = enumeration(
		ENUM_EXAMPLE,
		faker.helpers.arrayElement(ENUM_EXAMPLE),
		{
			optional: true,
		},
	);

	array = array(() => number(faker.number.int()), []);

	subarray = array(() => new SubClass(), []);

	object = new SubClass();

	derive = derive<TestClass>((c) => c.number);

	macro = macro('@number');
}

describe('Proxy', () => {
	describe('Special objects', () => {
		test('StringWrapper', () => {
			const text = faker.string.sample();

			const sut = charProxy(new TestClass());
			sut.string = text;

			expect(sut.string).toBe(text);
		});

		test('NumberWrapper', () => {
			const numberValue = faker.number.int();

			const sut = charProxy(new TestClass());
			sut.number = numberValue;

			expect(sut.number).toBe(numberValue);
		});

		test('BoolWrapper', () => {
			const booleanValue = faker.datatype.boolean();

			const sut = charProxy(new TestClass());
			sut.boolean = booleanValue;

			expect(sut.boolean).toBe(booleanValue);
		});

		test('EnumWrapper', () => {
			const text = faker.helpers.arrayElement(ENUM_EXAMPLE);

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
			const arrayValue = faker.helpers.multiple(() =>
				number(faker.number.int()),
			);

			const sut = charProxy(new TestClass());
			sut.$.array.value = arrayValue;

			expect(sut.array).toStrictEqual(arrayValue.map((c) => c.value));
			expect(sut.$.array.value).toStrictEqual(arrayValue);
		});

		test('ArrayWrapper Object', () => {
			const arrayValue = faker.helpers.multiple(() => new SubClass());

			const sut = charProxy(new TestClass());
			sut.$.subarray.value = arrayValue;

			expect(sut.subarray).toStrictEqual(arrayValue);
		});

		test('Derive', () => {
			const numberValue = faker.number.int();

			const sut = charProxy(new TestClass());
			sut.number = numberValue;

			expect(sut.derive).toBe(numberValue);
		});

		test('Macro', () => {
			const numberValue = faker.number.int();

			const sut = charProxy(new TestClass());
			sut.number = numberValue;

			expect(sut.$.macro.expr).toBe('@number');
			expect(sut.macro).toBe(numberValue);

			sut.$.macro.expr = '@number * 3';

			expect(sut.$.macro.expr).toBe('@number * 3');
			expect(sut.macro).toBe(numberValue * 3);
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
