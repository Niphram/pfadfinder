<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { title } from '$lib/components/dialog.svelte';
	import { saveCharacter } from '$lib/preview/character-store';
	import { SYSTEM_MAP, type SystemName } from '$lib/preview/systems';

	$title = 'Create Character';

	function createAndOpenCharacter(system: SystemName) {
		saveCharacter(new SYSTEM_MAP[system].character()).then((id) =>
			goto(`${base}/preview/character?id=${id}`)
		);
	}
</script>

<div class="flex flex-col gap-4">
	<div class="divider">Select a system</div>

	<div class="flex h-full flex-col gap-2">
		{#each Object.keys(SYSTEM_MAP) as system}
			<button class="btn btn-primary" on:click={() => createAndOpenCharacter(system)}>
				{system}
			</button>
		{/each}
	</div>
</div>
