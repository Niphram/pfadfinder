<script lang="ts">
	import { c } from '$lib/data';
	import { t } from '$lib/i18n';

	import { closeDialog, openDialog, title } from '../dialog.svelte';

	import RestDialog from './rest-dialog.svelte';
	import SettingsDialog from './settings-dialog.svelte';

	$: navButtons = [
		{ key: 'abilities', active: true },
		{ key: 'combat', active: true },
		{ key: 'skills', active: true },
		{ key: 'spells', active: true },
		{ key: 'features_traits', active: true },
		{ key: 'equipment', active: true },
		{ key: 'character', active: true },
		{ key: 'persona', active: $c.settings.usePersonaSystem }
	] as const;

	$title = '';
</script>

<div class="flex h-full flex-col gap-2">
	{#each navButtons as { key, active } (key)}
		{#if active}
			<a href="#{key}" class="btn w-full" on:click={closeDialog}>{$t(`texts.pages.${key}`)}</a>
		{/if}
	{/each}

	<div class="grow" />

	<button class="btn btn-accent w-full" on:click={() => openDialog(RestDialog, {})}>Rest</button>

	<div class="divider">Options</div>

	<button class="btn btn-outline btn-accent w-full" on:click={() => openDialog(SettingsDialog, {})}
		>Settings</button
	>
</div>
