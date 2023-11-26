<script lang="ts">
	import { resetChar } from '$lib/data';
	import { t } from '$lib/i18n';

	import { closeDialog, openDialog, title } from '../dialog.svelte';
	import Steps from '../steps.svelte';

	import RestDialog from './rest-dialog.svelte';

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

	<button class="btn btn-secondary w-full" on:click={() => openDialog(RestDialog, {})}>Rest</button>

	<div class="divider">Options</div>

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
			class="btn"
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
