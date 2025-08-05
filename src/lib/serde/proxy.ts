import DeepProxy from 'proxy-deep';

import { ArrayWrapper } from './types/array.svelte';
import { BoolWrapper } from './types/bool.svelte';
import { Derive } from './types/derive.svelte';
import { EnumWrapper } from './types/enum.svelte';
import { Macro } from './types/macro.svelte';
import { NumberWrapper } from './types/number.svelte';
import { StringWrapper } from './types/string.svelte';

export type SerdeProxy<T> =
	T extends StringWrapper<string, boolean> ? T['value']
	: T extends NumberWrapper<boolean> ? T['value']
	: T extends BoolWrapper ? T['value']
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends EnumWrapper<any, boolean> ? T['value']
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Derive<any> ? number
	: T extends Macro ? number
	: T extends ArrayWrapper<infer A> ? SerdeProxy<A>[]
	: T extends Array<infer A> ? SerdeProxy<A>[] & Record<`$${number}`, A>
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends (this: SerdeProxy<any>, ...args: infer Args) => infer R ? (...args: Args) => R
	: T extends object ?
		{ [K in keyof T]: SerdeProxy<T[K]> } & {
			[K in Extract<keyof T, string> as `$${K}`]: T[K];
		}
	:	T;

function isValueWrapper(obj: unknown) {
	return (
		obj instanceof StringWrapper ||
		obj instanceof NumberWrapper ||
		obj instanceof BoolWrapper ||
		obj instanceof EnumWrapper
	);
}

export function charProxy<T extends object>(char: T) {
	const dp = new DeepProxy(char, {
		get(target, p) {
			if (typeof p === 'string' && p.startsWith('$')) {
				return Reflect.get(target, p.slice(1));
			}

			const property = Reflect.get(target, p);

			if (isValueWrapper(property)) {
				return property.value;
			} else if (property instanceof ArrayWrapper) {
				return this.nest(property.value);
			} else if (property instanceof Derive) {
				return property.eval(dp);
			} else if (property instanceof Macro) {
				return property.eval(dp);
			} else if (typeof property === 'object') {
				return this.nest(property);
			}

			return property;
		},

		set(target, p, value) {
			const property = Reflect.get(target, p);

			if (isValueWrapper(property)) {
				return Reflect.set(property, 'value', value);
			} else if (property instanceof ArrayWrapper) {
				return Reflect.set(property, 'value', value);
			} else if (p in target) {
				return Reflect.set(target, p, value);
			}

			return false;
		},
	});

	return dp as SerdeProxy<T>;
}
