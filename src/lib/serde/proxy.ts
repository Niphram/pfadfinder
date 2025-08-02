import type { Ability } from '$lib/data';
import type { Array } from './types/array.svelte';
import type { Boolean } from './types/boolean.svelte';
import type { Enumeration } from './types/enum.svelte';
import type { Number } from './types/number.svelte';
import type { Object } from './types/object.svelte';
import type { String } from './types/string.svelte';

export type SerdeProxy<T> =
	T extends String<string, boolean> ? T['value']
	: T extends Number<boolean> ? T['value']
	: T extends Boolean ? T['value']
	: T extends Enumeration<unknown, boolean> ? T['value']
	: T extends Array<unknown> ? SerdeProxy<T['value']>[]
	: T extends Object<object> ? { [K in keyof T['value']]: SerdeProxy<T['value'][K]> }
	: T;

type Test = SerdeProxy<Object<Ability>>;
