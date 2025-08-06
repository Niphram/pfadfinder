<script lang="ts">
	import { getChar } from '$lib/data/context';
	import { persisted } from '$lib/data/storage';
	import { preventDefault } from '$lib/utils';
	import { openDialog, title } from '../dialog.svelte';
	import Toggle from '../input/toggle.svelte';
	import Steps from '../steps.svelte';
	import { isDarkMode, toggleDarkMode } from '../theme-changer.svelte';
	import MacroDebugDialog from './debug/macro-debug-dialog.svelte';
	import ImportExportDialog from './import-export-dialog.svelte';

	const { c } = $derived(getChar());

	$title = 'Settings';
</script>

<Toggle name="darkMode" label="Dark mode" checked={$isDarkMode} onchange={toggleDarkMode} />

<Toggle name="magicPage" label="Show Magic Page" bind:checked={c.settings.showMagicPage} />

<Toggle
	name="personaSystem"
	label="Use Persona System"
	bind:checked={c.settings.usePersonaSystem}
/>

<Toggle
	name="syntaxHighlighting"
	label="Enable Macro Highlighting"
	bind:checked={c.settings.enableMacroHighlighting}
/>

<div>Persistent storage: {$persisted}</div>

<Toggle
	name="experimental"
	label="Enable experimental features"
	bind:checked={c.settings.experimentalFeatures}
/>

<div class="divider">Danger</div>

<div class="flex flex-col gap-4">
	{#if c.settings.experimentalFeatures}
		<button
			class="btn btn-secondary w-full"
			onclick={preventDefault(() => openDialog(MacroDebugDialog, {}))}>Macro debugger</button
		>
	{/if}

	<button
		class="btn btn-secondary w-full"
		onclick={preventDefault(() => openDialog(ImportExportDialog, {}))}>Import/Export</button
	>

	<Steps
		steps={[
			{ label: 'Delete Character', style: { warning: true, outline: true } },
			{ label: 'Are you sure?', style: { warning: true } },
			{
				label: 'REALLY SURE???',
				style: { error: true },
				onClick: () => {
					// TODO!
					//c.set(new Character());
				},
			},
		]}
	>
		{#snippet children({ props: { label, onClick, style }, next })}
			<button
				class="btn w-full"
				class:btn-warning={style.warning}
				class:btn-outline={style.outline}
				class:btn-error={style.error}
				onclick={onClick ??
					((ev) => {
						ev.preventDefault();
						next();
					})}
			>
				{label}
			</button>
		{/snippet}
	</Steps>
</div>
