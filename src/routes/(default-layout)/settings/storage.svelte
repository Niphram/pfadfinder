<script lang="ts">
	import { storagemanager } from '#lib/state/storagemanager.svelte.ts';

	import Alert from '#lib/atoms/alert.svelte';
	import Divider from '#lib/atoms/divider.svelte';

	const storage = await storagemanager();

	let persistentStorageRequested = $state(false);
	async function requestPersistentStorage() {
		await storage?.persist().catch((err) => {
			console.error(err);
			alert('Something went wrong while trying to request permission.');
		});

		persistentStorageRequested = true;
	}

	function formatBytes<T extends number[]>(
		...bytes: T
	): { [K in keyof T]: string } {
		const UNITS = ['bytes', 'kB', 'MB', 'GB', 'TB'];

		const max = bytes.reduce((max, cur) => Math.max(max, cur));

		const unit = Math.min(Math.floor(Math.log10(max) / 3), UNITS.length);
		const factor = Math.pow(10, unit * 3);

		return bytes.map((v) => `${(v / factor).toFixed(1)} ${UNITS[unit]}`) as {
			[K in keyof T]: string;
		};
	}
</script>

<div>
	<Divider>Storage</Divider>

	<div class="flex flex-col gap-2">
		{#if storage}
			<!-- Show persistent storage warnings -->
			{#if !storage.persisted}
				{#if persistentStorageRequested}
					<Alert level="warning">Could not enable persistent storage</Alert>
				{:else}
					<Alert level="warning">
						You have not granted permissions to enable persistent storage. There
						is no guarantee, that your browser will keep your data safe.
						{#snippet actionChildren()}
							<button
								class="btn btn-primary btn-sm"
								onclick={requestPersistentStorage}
							>
								Request Permission
							</button>
						{/snippet}
					</Alert>
				{/if}
			{/if}

			<!-- quota information -->
			<p>
				This application uses your browser storage to save characters and
				settings. Browsers allocate sites a quota that they are allowed to use,
				depending on multiple factors. See your usage here:
			</p>

			{#if storage.quota !== undefined && storage.usage !== undefined}
				{@const [usage, quota] = formatBytes(storage.usage, storage.quota)}
				{@const percentage = (storage.usage / storage.quota).toFixed(0)}

				<p>
					You are currently using <span class="font-semibold"
						>{usage} of {quota} (~{percentage}%)</span
					>
				</p>
			{:else if storage.usage !== undefined}
				{@const [usage] = formatBytes(storage.usage)}
				<p>
					You are currently using <span class="font-semibold">{usage}</span>
				</p>
			{:else}
				<p>Your browser didn't report information about storage limits.</p>
			{/if}
		{:else}
			<Alert level="warning">
				Your browser does not support the StorageManager API
			</Alert>
		{/if}
	</div>
</div>
