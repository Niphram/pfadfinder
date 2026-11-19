<script lang="ts">
	import { settingsProxy } from '#lib/state/settings.svelte.js';
	import { awaited_throttle_re } from '#lib/utils/throttle.js';

	import Container from '#lib/atoms/container.svelte';

	import Appearance from './appearance.svelte';
	import Experiments from './experiments.svelte';
	import Storage from './storage.svelte';

	const { data } = $props();

	const { db, settingsValues } = $derived(data);

	const settingsCallback = awaited_throttle_re(
		async (key: string, value: string | number | boolean | Date) => {
			await db.updateSetting(key, value);
		},
	);

	let settings = $derived(settingsProxy(settingsValues, settingsCallback));
</script>

<svelte:head>
	<title>Settings - Pfadfinder</title>
</svelte:head>

<Container class="flex flex-col gap-4">
	<Appearance />

	<Storage />

	<Experiments bind:settings />
</Container>
