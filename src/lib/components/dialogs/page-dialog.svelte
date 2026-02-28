<script lang="ts">
	import { t } from '$lib/i18n';
	import { preventDefault } from '$lib/utils';

	import DialogBase from '$lib/atoms/dialog-base.svelte';

	import { useDialog } from '$lib/components/dialog-provider.svelte';
	import RestDialog from '$lib/components/dialogs/rest-dialog.svelte';
	import SettingsDialog from '$lib/components/dialogs/settings-dialog.svelte';

	import { getChar } from '$lib/data';

	import ConditionsDialog from './conditions-dialog.svelte';

	const { openDialog } = useDialog();
	const { c } = $derived(getChar());

	let navButtons = $derived([
		{ key: 'abilities', active: true },
		{ key: 'combat', active: true },
		{ key: 'skills', active: true },
		{ key: 'spells', active: c.settings.showMagicPage },
		{ key: 'features_traits', active: true },
		{ key: 'equipment', active: true },
		{ key: 'character', active: true },
		{ key: 'persona', active: c.settings.usePersonaSystem },
	] as const);
</script>

<DialogBase title="">
	<div class="flex h-full flex-col gap-2">
		{#each navButtons as { key, active } (key)}
			{#if active}
				<button
					class="btn w-full"
					onclick={() => {
						// Quick fix after switching to hash-routing.
						const page = document.getElementById(key);
						page?.parentElement?.scrollTo({
							behavior: 'smooth',
							left: page?.offsetLeft,
							top: 0,
						});
					}}>{$t(`texts.pages.${key}`)}</button
				>
			{/if}
		{/each}

		<div class="grow"></div>

		{#if c.settings.enableExperimentalConditions}
			<button
				class="btn btn-accent w-full"
				onclick={preventDefault(() => openDialog(ConditionsDialog, {}))}
				>Conditions</button
			>
		{/if}

		<button
			class="btn btn-accent w-full"
			onclick={preventDefault(() => openDialog(RestDialog, {}))}>Rest</button
		>

		<div class="divider">Options</div>

		<button
			class="btn btn-outline btn-accent w-full"
			onclick={preventDefault(() => openDialog(SettingsDialog, {}))}
		>
			Settings
		</button>
	</div>
</DialogBase>
