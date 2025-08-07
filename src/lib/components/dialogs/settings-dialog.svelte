<script lang="ts">
	import { getChar } from '$lib/data/context';
	import { persisted } from '$lib/data/storage';
	import { preventDefault } from '$lib/utils';
	import { openDialog, title } from '../dialog.svelte';
	import Toggle from '../input/toggle.svelte';
	import { isDarkMode, toggleDarkMode } from '../theme-changer.svelte';
	import MacroDebugDialog from './debug/macro-debug-dialog.svelte';

	const { c } = $derived(getChar());

	$title = 'Settings';

	const showDanger = $derived(c.settings.experimentalFeatures);
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

{#if showDanger}
	<div class="divider">Danger</div>

	<div class="flex flex-col gap-4">
		{#if c.settings.experimentalFeatures}
			<button
				class="btn btn-secondary w-full"
				onclick={preventDefault(() => openDialog(MacroDebugDialog, {}))}>Macro debugger</button
			>
		{/if}
	</div>
{/if}
