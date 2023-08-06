<script lang="ts">
	import { abilityKeys, saveKeys } from '$lib/state';

	import { openDialog } from '$lib/components/dialog.svelte';

	import AbilityButton from '$lib/components/buttons/ability-button.svelte';
	import AcButton from '$lib/components/buttons/ac-button.svelte';
	import InitButton from '$lib/components/buttons/init-button.svelte';
	import SaveButton from '$lib/components/buttons/save-button.svelte';

	import AbilityDialog from '$lib/components/dialogs/ability-dialog.svelte';
	import AcDialog from '$lib/components/dialogs/ac-dialog.svelte';
	import InitDialog from '$lib/components/dialogs/init-dialog.svelte';
	import SaveDialog from '$lib/components/dialogs/save-dialog.svelte';
</script>

<div class="flex flex-col">
	<div class="divider">Abilities</div>

	<div class="grid w-full grid-cols-3 gap-2 md:grid-cols-6">
		{#each abilityKeys as key}
			<AbilityButton {key} on:click={() => openDialog(AbilityDialog, { key })} />
		{/each}
	</div>

	<div class="divider">Initiative</div>

	<InitButton on:click={() => openDialog(InitDialog, {})} />

	<div class="divider">Armor Class</div>

	<AcButton on:click={() => openDialog(AcDialog, {})} />

	<div class="divider">Saves</div>

	<div class="grid w-full grid-cols-3 gap-2">
		{#each saveKeys as key}
			<SaveButton {key} on:click={() => openDialog(SaveDialog, { key })} />
		{/each}
	</div>
</div>
