import DeepProxy from 'proxy-deep';

import { ArrayWrapper } from './types/array.svelte';
import { BoolWrapper } from './types/bool.svelte';
import { Derive } from './types/derive.svelte';
import { EnumWrapper } from './types/enum.svelte';
import { Macro } from './types/macro.svelte';
import { NumberWrapper } from './types/number.svelte';
import { ObjectWrapper } from './types/object.svelte';
import { StringWrapper } from './types/string.svelte';

export type SerdeProxy<T> =
	T extends StringWrapper<string, boolean> ? T['value']
	: T extends NumberWrapper<boolean> ? T['value']
	: T extends BoolWrapper ? T['value']
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends EnumWrapper<any, boolean> ? T['value']
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Derive<any> ? number
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Macro<any> ? number
	: T extends ArrayWrapper<infer A> ? SerdeProxy<A>[]
	: T extends Array<infer A> ? SerdeProxy<A>[] & Record<`$${number}`, A>
	: T extends ObjectWrapper<infer O> ? SerdeProxy<O>
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
				const prop = p.slice(1);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				return (target as any)[prop];
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const property = (target as any)[p];

			if (isValueWrapper(property)) {
				return property.value;
			} else if (property instanceof ObjectWrapper) {
				return this.nest(property.value);
			} else if (property instanceof ArrayWrapper) {
				return this.nest(property.value);
			} else if (property instanceof Derive) {
				return property.eval(dp);
			} else if (property instanceof Macro) {
				return property.eval(dp);
			}

			return property;
		},

		set(target, p, value) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const property = (target as any)[p];

			if (isValueWrapper(property)) {
				property.value = value;
				return true;
			} else if (property instanceof ObjectWrapper) {
				property.value = value;
				return true;
			} else if (property instanceof ArrayWrapper) {
				property.value = value;
				return true;
			} else if (p in target) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(target as any)[p] = value;
			}

			return false;
		},
	});

	return dp as SerdeProxy<T>;
}
