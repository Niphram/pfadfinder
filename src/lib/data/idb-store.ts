import { browser } from '$app/environment';
import { DeserializeInto, Serialize } from 'cerialize';
import * as idbKeyVal from 'idb-keyval';
import { readonly, writable, type Updater, type Writable } from 'svelte/store';

import { debounce } from '$lib/utils';

type IDBWritableOptions = {
	timeout?: number;
	loadError?: (err: unknown) => void;
};

export function idbWritable<T extends object>(
	key: string,
	Class: new () => T,
	{ timeout = 1000, loadError }: IDBWritableOptions = {}
) {
	const store = writable(new Class());
	const loaded = writable(false);
	const dirty = writable(false);

	if (browser) {
		idbKeyVal
			.get<T>(key)
			.then((data) => {
				if (data) {
					const newDataObj = new Class();
					DeserializeInto(data, Class, newDataObj);
					store.set(newDataObj);
				}
			})
			.catch(async (err) => {
				store.set(new Class());
				await idbKeyVal.del(key);
				console.error(err);
				loadError?.(err);
			})
			.finally(() => {
				loaded.set(true);
			});
	}

	const debouncedSave = debounce(async (data: T) => {
		await idbKeyVal.set(key, Serialize(data));
		dirty.set(false);
	}, timeout);

	function save(data: T) {
		if (browser) {
			dirty.set(true);
			debouncedSave(data);
		}
	}

	function set(data: T) {
		save(data);
		store.set(data);
	}

	function update(updater: Updater<T>) {
		store.update((value) => {
			const updatedValue = updater(value);
			save(updatedValue);
			return updatedValue;
		});
	}

	return {
		data: {
			set,
			update,
			subscribe: store.subscribe
		} satisfies Writable<T>,
		loaded: readonly(loaded),
		dirty: readonly(dirty)
	};
}
