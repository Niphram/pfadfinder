<script lang="ts">
	import type { settingsProxy } from '#lib/state/settings.svelte.ts';

	import Divider from '#lib/atoms/divider.svelte';

	import Toggle from '#lib/components/input/toggle.svelte';

	type Props = {
		settings: ReturnType<typeof settingsProxy>;
	};

	const { settings = $bindable() }: Props = $props();
</script>

<div>
	<Divider>Experimental</Divider>

	<div class="flex flex-col gap-2">
		<p>
			This section will contain experimental features that are not yet stable.
		</p>

		<Toggle
			name="experimentalFeatures"
			label="Enable experimental features"
			bind:checked={settings.experimentalFeaturesEnabled}
		/>

		{#if settings.experimentalFeaturesEnabled}
			<p>Nothing here yet :)</p>
		{/if}
	</div>
</div>
