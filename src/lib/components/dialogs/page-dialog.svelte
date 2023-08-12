<script lang="ts">
	import { t } from '$lib/i18n';
	import { resetChar } from '$lib/state';

	import { closeDialog } from '../dialog.svelte';
	import Steps from '../steps.svelte';

	let navButtons = ['abilities', 'combat', 'skills', 'spells', 'equipment', 'character'] as const;
</script>

<div class="flex flex-col gap-2">
	{#each navButtons as key (key)}
		<a href="#{key}" class="btn w-full" on:click={closeDialog}>{$t(`texts.pages.${key}`)}</a>
	{/each}

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
