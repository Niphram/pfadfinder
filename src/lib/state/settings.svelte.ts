import { error } from '@sveltejs/kit';
import * as v from 'valibot';

import type { IDBStorage } from '../storage';

const SettingsSchema = v.object({
	experimentalFeaturesEnabled: v.optional(v.boolean(), false),
});

export function settingsProxy(
	values: Awaited<ReturnType<IDBStorage['getSettings']>>,
	cb: (key: string, value: string | number | boolean | Date) => void,
): v.InferOutput<typeof SettingsSchema> {
	const settingsObj = values.reduce<Record<string, unknown>>(
		(acc, cur) => ((acc[cur.key] = cur.value), acc),
		{},
	);

	const result = v.safeParse(SettingsSchema, settingsObj);

	if (!result.success) {
		error(400, 'Could not load settings!');
	}

	const state = $state(result.output);

	return new Proxy(state, {
		set(target, p, newValue, receiver) {
			const res = Reflect.set(target, p, newValue, receiver);

			if (res) cb(p as string, newValue);

			return res;
		},
	});
}
