import { makeCachedProxyFactory } from '$lib/utils';

import { ArrayWrapper } from './types/array.svelte';
import { BoolWrapper } from './types/bool.svelte';
import { Derive } from './types/derive.svelte';
import { EnumWrapper } from './types/enum.svelte';
import { Macro } from './types/macro.svelte';
import { NumberWrapper } from './types/number.svelte';
import { StringWrapper } from './types/string.svelte';

export type SerdeProxy<T> =
	T extends StringWrapper<string> ? T['value']
	: T extends NumberWrapper<boolean> ? T['value']
	: T extends BoolWrapper ? T['value']
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends EnumWrapper<any, boolean> ? T['value']
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Derive<any, infer R> ? R
	: T extends Macro<false> ? number
	: T extends Macro<true> ? number | null
	: T extends ArrayWrapper<infer A> ? SerdeProxy<A>[]
	: T extends Array<infer A> ? SerdeProxy<A>[] & { $: Array<A> }
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends (this: SerdeProxy<any>, ...args: infer Args) => infer R ? (...args: Args) => R
	: T extends object ?
		{ [K in keyof T]: SerdeProxy<T[K]> } & {
			$: T;
		}
	:	T;

export function charProxy<T extends object>(char: T) {
	const proxyFactory = makeCachedProxyFactory();

	function makeCharProxy(value: object) {
		return proxyFactory(value, {
			get(target, key) {
				if (key === '$') {
					return target;
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
	}

	const dp = makeCharProxy(char) as SerdeProxy<T>;
	return dp;
}
