<script lang="ts">
	import { closeDialog, openDialog, title } from '$lib/components/dialog.svelte';
	import type { Writable } from 'svelte/store';
	import type { PathfinderCharacter } from '../data';
	import SettingsDialog from './settings-dialog.svelte';
	import { base } from '$app/paths';

	$title = '';

	const pages = [{ key: 'character', enabled: true }] as const;

	export let c: Writable<PathfinderCharacter>;
</script>

<div class="flex h-full flex-col gap-2">
	{#each pages as { key, enabled } (key)}
		{#if enabled}
			<a href="#{key}" class="btn w-full" on:click={closeDialog}>{key}</a>
		{/if}
	{/each}

	<div class="divider">Options</div>

	<button
		class="btn btn-outline btn-accent w-full"
		on:click={() => openDialog(SettingsDialog, { c })}
	>
		Settings
	</button>

	<a href="{base}/preview" class="btn btn-neutral w-full" on:click={closeDialog}>Exit</a>
</div>
