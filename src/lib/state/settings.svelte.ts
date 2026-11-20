import { createContext } from 'svelte';

import { browser } from '$app/env';

import { awaited_throttle_re } from '#lib/utils/throttle.ts';

import type { SerdeProxy } from '../serde';
import {
	boolean,
	charProxy,
	ClassSerializer,
	DESERIALIZE_SYMBOL,
	string,
} from '../serde';
import { IDBStorage } from '../storage';

export class Settings extends ClassSerializer {
	readonly experimentalFeaturesEnabled = boolean(false);

	readonly lastAcknowledgedVersion = string(null, { optional: true });

	readonly lastAcknowledgedChangelog = string(null, { optional: true });
}

const [useSettings, setSettings] = createContext<SerdeProxy<Settings>>();
export { useSettings };

export function initSettings() {
	const state = $state(new Settings());

	let loadPromise: Promise<void> | undefined;
	if (browser) {
		const db = IDBStorage.init();
		loadPromise = db.getSettings().then((values) => {
			const settingsObj = values.reduce<Record<string, unknown>>(
				(acc, cur) => ((acc[cur.key] = cur.value), acc),
				{},
			);

			state[DESERIALIZE_SYMBOL](settingsObj);
		});
	}

	const settingsCallback = awaited_throttle_re(
		async (key: string, value: string | number | boolean | Date) => {
			await IDBStorage.init().updateSetting(key, value);
		},
	);

	setSettings(
		new Proxy(charProxy(state), {
			set(target, p, newValue, receiver) {
				const res = Reflect.set(target, p, newValue, receiver);

				if (res) settingsCallback(p as string, newValue);

				return res;
			},
		}),
	);

	return loadPromise;
}
