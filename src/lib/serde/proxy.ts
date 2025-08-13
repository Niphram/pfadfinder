import { makeCachedProxyFactory } from '$lib/utils';

import { ArrayWrapper } from './types/array.svelte';
import { BoolWrapper } from './types/bool.svelte';
import { Derive } from './types/derive.svelte';
import { EnumWrapper } from './types/enum.svelte';
import { Macro } from './types/macro.svelte';
import { NumberWrapper } from './types/number.svelte';
import { StringWrapper } from './types/string.svelte';

export type CharProxy<T> =
	T extends StringWrapper<string, boolean> ? T['value']
	: T extends NumberWrapper<boolean> ? T['value']
	: T extends BoolWrapper ? T['value']
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends EnumWrapper<any, boolean> ? T['value']
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Derive<any> ? number
	: T extends Macro ? number
	: T extends ArrayWrapper<infer A> ? CharProxy<A>[] & { $: A[] }
	: T extends Array<infer A> ? CharProxy<A>[]
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends (this: CharProxy<any>, ...args: infer Args) => infer R ? (...args: Args) => R
	: T extends object ?
		{ [K in keyof T]: CharProxy<T[K]> } & {
			[K in Extract<keyof T, string> as `$${K}`]: T[K];
		} & {
			$: T;
		}
	:	T;

// Use same cache for all
const proxyFactory = makeCachedProxyFactory();

export function charProxy<T extends object>(char: T) {
	const dp = (function makeCharProxy(value: object) {
		return proxyFactory(value, {
			get(target, key) {
				if (key === '$') {
					return target;
				}

				if (typeof key === 'string' && key.startsWith('$')) {
					return Reflect.get(target, key.slice(1));
				}

				const property = Reflect.get(target, key);

				if (
					property instanceof StringWrapper ||
					property instanceof NumberWrapper ||
					property instanceof BoolWrapper ||
					property instanceof EnumWrapper
				) {
					return property.value;
				} else if (property instanceof Derive || property instanceof Macro) {
					return property.eval(dp);
				} else if (property instanceof ArrayWrapper) {
					return makeCharProxy(property.value);
				} else if (typeof property === 'object') {
					return makeCharProxy(property);
				}

				return property;
			},

			set(target, key, newValue) {
				const property = Reflect.get(target, key);

				if (
					property instanceof StringWrapper ||
					property instanceof NumberWrapper ||
					property instanceof BoolWrapper ||
					property instanceof EnumWrapper ||
					property instanceof ArrayWrapper
				) {
					return Reflect.set(property, 'value', newValue);
				}

				return Reflect.set(target, key, newValue);
			},
		});
	})(char) as CharProxy<T>;

	return dp;
}
