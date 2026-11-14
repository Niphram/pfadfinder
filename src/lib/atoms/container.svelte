<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		children?: Snippet;
		class?: ClassValue;
	};

	const { children, class: classValue }: Props = $props();
</script>

<div class={['mx-auto max-w-2xl rounded-md bg-base-100 p-4', classValue]}>
	{@render children?.()}
</div>
