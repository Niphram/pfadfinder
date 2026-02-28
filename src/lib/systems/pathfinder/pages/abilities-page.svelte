<script lang="ts">
	import AbilityButton from '$lib/components/buttons/ability-button.svelte';
	import AcButton from '$lib/components/buttons/ac-button.svelte';
	import InitButton from '$lib/components/buttons/init-button.svelte';
	import SaveButton from '$lib/components/buttons/save-button.svelte';
	import { useDialog } from '$lib/components/dialog-provider.svelte';
	import AcDialog from '$lib/components/dialogs/ac-dialog.svelte';
	import { useToast } from '$lib/components/toast-provider.svelte';
	import SimpleToast from '$lib/components/toasts/simple-toast.svelte';

	import { ABILITY_KEYS, getChar, SAVE_KEYS } from '$lib/data';

	const { showToast } = useToast();
	const { openDialog } = useDialog();

	const { c } = $derived(getChar());
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

	<AcButton
		oncontextmenu={() => openDialog(AcDialog, {})}
		onclick={() =>
			c.ac.affectedByCondition &&
			showToast(SimpleToast, {
				message: 'Affected by conditions!',
				type: 'warning',
				icon: 'warning',
			})}
		class={[
			c.ac.affectedByCondition && 'btn-warning underline decoration-wavy',
		]}
	/>

	<div class="divider">Saves</div>

	<div class="grid w-full grid-cols-3 gap-2">
		{#each SAVE_KEYS as key (key)}
			<SaveButton {key} />
		{/each}
	</div>
</div>
