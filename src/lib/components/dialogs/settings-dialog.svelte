<script lang="ts">
	import { preventDefault } from '$lib/utils';

	import { openDialog, title } from '$lib/components/dialog.svelte';
	import MacroDebugDialog from '$lib/components/dialogs/debug/macro-debug-dialog.svelte';
	import Toggle from '$lib/components/input/toggle.svelte';
	import { isDarkMode, toggleDarkMode } from '$lib/components/theme-changer.svelte';

	import { getChar, persisted } from '$lib/data';

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
