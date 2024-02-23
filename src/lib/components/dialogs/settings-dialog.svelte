<script lang="ts">
	import { resetChar } from '$lib/data';
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

<div>Persistent storage: {$persisted}</div>

<div class="divider">Danger</div>

<div class="flex flex-col gap-4">
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
