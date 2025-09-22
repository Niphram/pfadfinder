<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		legend?: string;
		hint?: string;
		feedback?: string;

		children: Snippet;

		fieldsetClass?: ClassValue;
		feedbackClass?: ClassValue;
	};

	const {
		legend,
		hint,
		feedback,
		children,
		fieldsetClass,
		feedbackClass,
	}: Props = $props();
</script>

<fieldset class={['fieldset w-full min-w-0', fieldsetClass]}>
	{#if legend}
		<legend class="fieldset-legend w-full py-1">
			<span>{legend}</span>
			{#if hint}
				<div class="badge badge-xs overflow-hidden">
					<span class="overflow-hidden overflow-ellipsis whitespace-nowrap">
						{hint}
					</span>
				</div>
			{/if}
		</legend>
	{/if}

	{@render children()}

	{#if feedback !== undefined}
		<div class={['text-xs', feedbackClass]}>{feedback}</div>
	{/if}
</fieldset>
