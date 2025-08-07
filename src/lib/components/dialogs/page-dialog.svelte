<script lang="ts">
	import { getChar } from '$lib/data/context';
	import { t } from '$lib/i18n';

	import { closeDialog, openDialog, title } from '../dialog.svelte';

	import RestDialog from './rest-dialog.svelte';
	import SettingsDialog from './settings-dialog.svelte';

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

	$title = '';
</script>

<div class="flex h-full flex-col gap-2">
	{#each navButtons as { key, active } (key)}
		{#if active}
			<button
				class="btn w-full"
				onclick={() => {
					// Quick fix after switching to hash-routing.
					const page = document.getElementById(key);
					page?.parentElement?.scrollTo({ behavior: 'smooth', left: page?.offsetLeft, top: 0 });
					closeDialog();
				}}>{$t(`texts.pages.${key}`)}</button
			>
		{/if}
	{/each}

	<div class="grow"></div>

	<button class="btn btn-accent w-full" onclick={() => openDialog(RestDialog, {})}>Rest</button>

	<div class="divider">Options</div>

	<button class="btn btn-outline btn-accent w-full" onclick={() => openDialog(SettingsDialog, {})}
		>Settings</button
	>
</div>
