export async function storagemanager() {
	if ('storage' in navigator) {
		const [estimate, persisted] = await Promise.all([
			navigator.storage.estimate(),
			navigator.storage.persisted(),
		]);

		const state = $state({
			usage: estimate.usage,
			quota: estimate.quota,
			persisted,
		});

		return {
			get usage() {
				return state.usage;
			},
			get quota() {
				return state.quota;
			},
			get persisted() {
				return state.persisted;
			},
			async persist() {
				const persisted = await navigator.storage.persist();

				const estimate = await navigator.storage.estimate();

				state.usage = estimate.usage;
				state.quota = estimate.quota;
				state.persisted = persisted;

				return persisted;
			},
		};
	}

	return undefined;
}
