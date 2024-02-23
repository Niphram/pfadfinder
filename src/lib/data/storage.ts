import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const persisted = writable(false);
export const loaded = writable(false);

if (browser) {
	if (navigator.storage && navigator.storage) {
		navigator.storage
			.persist()
			.then((p) => persisted.set(p))
			.catch(console.error)
			.finally(() => loaded.set(true));
	} else {
		loaded.set(true);
	}
}
