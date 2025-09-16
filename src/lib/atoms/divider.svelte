<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		class?: ClassValue;
		children?: Snippet;
	}

	const { class: className, children }: Props = $props();
</script>

<div class={['divider', className]}>
	{#if children}
		<div class="flex min-w-max flex-row items-center gap-2">
			{@render children()}
		</div>
	{/if}
</div>
