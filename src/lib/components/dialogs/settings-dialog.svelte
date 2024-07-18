<script lang="ts">
	import { base } from '$app/paths';
	import { c, resetChar } from '$lib/data';
	import { persisted } from '$lib/data/storage';
	import { openDialog, title } from '../dialog.svelte';
	import Steps from '../steps.svelte';
	import { isDarkMode, toggleDarkMode } from '../theme-changer.svelte';
	import ImportExportDialog from './import-export-dialog.svelte';

	$title = 'Settings';
</script>

<div class="form-control">
	<label class="label cursor-pointer">
		<span class="label-text">Dark Mode</span>
		<input type="checkbox" class="toggle" checked={$isDarkMode} on:change={toggleDarkMode} />
	</label>
</div>

<div class="form-control">
	<label class="label cursor-pointer">
		<span class="label-text">Use Persona System</span>
		<input type="checkbox" class="toggle" bind:checked={$c.settings.usePersonaSystem} />
	</label>
</div>

<div>Persistent storage: {$persisted}</div>

<div class="form-control">
	<label class="label cursor-pointer">
		<span class="label-text">Enable experimental features</span>
		<input type="checkbox" class="toggle" bind:checked={$c.settings.experimentalFeatures} />
	</label>
</div>

<div class="divider">Danger</div>

<div class="flex flex-col gap-4">
	{#if $c.settings.experimentalFeatures}
		<a href="{base}/preview" class="btn btn-warning w-full">Preview Site (Very W.I.P)</a>
	{/if}

	<button
		class="btn btn-secondary w-full"
		on:click|preventDefault={() => openDialog(ImportExportDialog, {})}>Import/Export</button
	>

	<Steps
		steps={[
			{ label: 'Delete Character', style: { warning: true, outline: true } },
			{ label: 'Are you sure?', style: { warning: true } },
			{ label: 'REALLY SURE???', style: { error: true }, onClick: resetChar }
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
