import { derived, writable, type Readable, type Updater, type Writable } from 'svelte/store';
import { getDeep, setDeep } from './deep';
import type { Get, Paths, Predicate } from './utilTypes';

export function substore<T, P extends Paths<T>>(store: Writable<T>, key: P): Writable<Get<T, P>> {
	const { subscribe } = derived(store, (val) => getDeep(val, key));

	const set = (val: Get<T, P>) => {
		store.update((storeVal) => (setDeep(storeVal, key, val), storeVal));
	};

	const update = (cb: Updater<Get<T, P>>) => {
		store.update((storeVal) => (setDeep(storeVal, key, cb(getDeep(storeVal, key))), storeVal));
	};

	return { subscribe, set, update };
}

export function deriveValidated<T, P extends Paths<T>>(
	store: Writable<T>,
	key: P,
	...predicates: Predicate<Get<T, P>>[]
): [store: Writable<Get<T, P>>, invalid: Readable<boolean>] {
	const sub = substore(store, key);
	const invalid = writable(false);

	function check(val: Get<T, P>) {
		const isValid = predicates.every((p) => p(val));
		invalid.set(!isValid);
		return isValid;
	}

	function set(val: Get<T, P>) {
		check(val) && sub.set(val);
	}

	function update(updater: Updater<Get<T, P>>) {
		sub.update((old) => {
			const val = updater(old);
			return check(val) ? val : old;
		});
	}

	return [
		{
			subscribe: sub.subscribe,
			set,
			update,
		},
		invalid,
	];
}

export function validated<T>(
	value: T,
	...predicates: Predicate<T>[]
): [store: Writable<T>, invalid: Readable<boolean>] {
	const store = writable(value);
	const invalid = writable(false);

	function check(val: T) {
		const isValid = predicates.every((p) => p(val));
		invalid.set(!isValid);
		return isValid;
	}

	function set(val: T) {
		check(val) && store.set(val);
	}

	function update(updater: Updater<T>) {
		store.update((old) => {
			const val = updater(old);
			return check(val) ? val : old;
		});
	}

	return [
		{
			subscribe: store.subscribe,
			set,
			update,
		},
		invalid,
	];
}
