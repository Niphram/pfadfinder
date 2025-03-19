<script lang="ts">
	import { base } from '$app/paths';
	import { Character } from '$lib/data';
	import { getChar } from '$lib/data/context';
	import { persisted } from '$lib/data/storage';
	import { openDialog, title } from '../dialog.svelte';
	import Toggle from '../input/toggle.svelte';
	import Steps from '../steps.svelte';
	import { isDarkMode, toggleDarkMode } from '../theme-changer.svelte';
	import MacroDebugDialog from './debug/macro-debug-dialog.svelte';
	import ImportExportDialog from './import-export-dialog.svelte';

	const { c } = getChar();

	$title = 'Settings';
</script>

<Toggle name="darkMode" label="Dark mode" checked={$isDarkMode} on:change={toggleDarkMode} />

<Toggle
	name="personaSystem"
	label="Use Persona System"
	bind:checked={$c.settings.usePersonaSystem}
/>

<div>Persistent storage: {$persisted}</div>

<Toggle
	name="experimental"
	label="Enable experimental features"
	bind:checked={$c.settings.experimentalFeatures}
/>

<div class="divider">Danger</div>

<div class="flex flex-col gap-4">
	{#if $c.settings.experimentalFeatures}
		<button
			class="btn btn-secondary w-full"
			on:click|preventDefault={() => openDialog(MacroDebugDialog, {})}>Macro debugger</button
		>

		<a href="{base}/beta/" class="btn btn-secondary w-full">Beta Page</a>
	{/if}

	<button
		class="btn btn-secondary w-full"
		on:click|preventDefault={() => openDialog(ImportExportDialog, {})}>Import/Export</button
	>

	<Steps
		steps={[
			{ label: 'Delete Character', style: { warning: true, outline: true } },
			{ label: 'Are you sure?', style: { warning: true } },
			{
				label: 'REALLY SURE???',
				style: { error: true },
				onClick: () => {
					c.set(new Character());
				}
			}
		]}
		let:props={{ label, onClick, style }}
		let:next
	>
		<button
			class="btn w-full"
			class:btn-warning={style.warning}
			class:btn-outline={style.outline}
			class:btn-error={style.error}
			on:click={onClick ??
				((ev) => {
					ev.preventDefault();
					next();
				})}
		>
			{label}
		</button>
	</Steps>
</div>
