<script lang="ts">
	import AbilityButton from '$lib/components/buttons/ability-button.svelte';
	import AcButton from '$lib/components/buttons/ac-button.svelte';
	import InitButton from '$lib/components/buttons/init-button.svelte';
	import SaveButton from '$lib/components/buttons/save-button.svelte';
	import { openDialog } from '$lib/components/dialog.svelte';
	import AcDialog from '$lib/components/dialogs/ac-dialog.svelte';

	import { ABILITY_KEYS, SAVE_KEYS } from '$lib/data';
</script>

<div class="flex flex-col">
	<div class="divider">Abilities</div>

	<div class="grid w-full grid-cols-3 gap-2 md:grid-cols-6">
		{#each ABILITY_KEYS as key (key)}
			<AbilityButton {key} />
		{/each}
	</div>

	<div class="divider">Initiative</div>

	<InitButton />

	<div class="divider">Armor Class</div>

	<AcButton oncontextmenu={() => openDialog(AcDialog, {})} />

	<div class="divider">Saves</div>

	<div class="grid w-full grid-cols-3 gap-2">
		{#each SAVE_KEYS as key (key)}
			<SaveButton {key} />
		{/each}
	</div>
</div>
