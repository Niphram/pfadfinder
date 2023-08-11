import { readonly, writable, type Updater, type Writable } from 'svelte/store';
import * as idbKeyVal from 'idb-keyval';

import type { DeepPartial } from '$lib/utils/utilTypes';
import { browser } from '$app/environment';
import { debounce } from '$lib/utils/debounce';

/**
 * Converts an object into plain data.
 * Does not fully copy the object.
 */
function plainOldData<T extends object>(o: T) {
	const descriptors = Object.getOwnPropertyDescriptors(o);

	const valueKeys = Object.keys(descriptors).filter((key) => descriptors[key].value !== undefined);

	return valueKeys.reduce<DeepPartial<T>>((ret, key) => {
		const v = descriptors[key].value;

		if (typeof v === 'object' && !Array.isArray(v)) {
			ret[key] = plainOldData(v);
		} else {
			ret[key] = v;
		}

		return ret;
	}, {});
}

/**
 * Assigns the data in pod to the object.
 */
function assignPOD<T extends object>(o: T, pod: DeepPartial<T>) {
	for (const key of Object.keys(pod)) {
		if (!(key in o)) continue;

		const value = pod[key];

		if (value !== undefined && value !== null) {
			if (typeof value === 'object' && !Array.isArray(value)) {
				assignPOD(o[key], value);
			} else {
				o[key] = value as T[typeof key];
			}
		}
	}
}

type IDBWritableOptions = {
	timeout?: number;
	loadError?: (err: unknown) => void;
};

export function idbWritable<T extends object>(
	key: string,
	dataFactory: () => T,
	{ timeout = 1000, loadError }: IDBWritableOptions = {}
) {
	const store = writable(dataFactory());
	const loaded = writable(false);
	const dirty = writable(false);

	if (browser) {
		idbKeyVal
			.get<T>(key)
			.then((data) => {
				if (data) {
					const newDataObj = dataFactory();
					assignPOD(newDataObj, data);
					store.set(newDataObj);
				}
			})
			.catch(async (err) => {
				store.set(dataFactory());
				await idbKeyVal.del(key);
				console.error(err);
				loadError?.(err);
			})
			.finally(() => {
				loaded.set(true);
			});
	}

	const debouncedSave = debounce(async (data: T) => {
		await idbKeyVal.set(key, plainOldData(data));
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

	function update(cb: Updater<T>) {
		store.update((data) => {
			const newData = cb(data);
			save(data);
			return newData;
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
