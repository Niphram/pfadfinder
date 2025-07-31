import type { Number } from './types/number.svelte';
import type { String } from './types/string.svelte';

export type SerdeProxy<T> =
	T extends String<string, boolean> ? T['value']
	: T extends Number<boolean> ? T['value']
	: never;
