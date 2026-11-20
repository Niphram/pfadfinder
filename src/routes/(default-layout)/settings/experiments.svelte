<script lang="ts">
	import { useSettings } from '#lib/state/settings.svelte.ts';

	import Button from '#lib/atoms/button.svelte';
	import Divider from '#lib/atoms/divider.svelte';

	import Toggle from '#lib/components/input/toggle.svelte';

	const settings = useSettings();
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
			<Button onclick={() => (settings.lastAcknowledgedVersion = '0')}>
				Test update notification
			</Button>
		{/if}
	</div>
</div>
