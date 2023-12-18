<script lang="ts">
	import { resetChar } from '$lib/data';
	import { t } from '$lib/i18n';

	import { closeDialog, openDialog, title } from '../dialog.svelte';

	import RestDialog from './rest-dialog.svelte';
	import SettingsDialog from './settings-dialog.svelte';

	let navButtons = [
		'abilities',
		'combat',
		'skills',
		'spells',
		'features_traits',
		'equipment',
		'character'
	] as const;

	$title = '';
</script>

<div class="flex h-full flex-col gap-2">
	{#each navButtons as key (key)}
		<a href="#{key}" class="btn w-full" on:click={closeDialog}>{$t(`texts.pages.${key}`)}</a>
	{/each}

	<div class="grow" />

	<button class="btn btn-accent w-full" on:click={() => openDialog(RestDialog, {})}>Rest</button>

	<div class="divider">Options</div>

	<button class="btn btn-outline btn-accent w-full" on:click={() => openDialog(SettingsDialog, {})}
		>Settings</button
	>
</div>
