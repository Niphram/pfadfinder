<script lang="ts">
	import MultilineMacro from '$lib/atoms/multiline-macro.svelte';

	interface Props {
		title: string;
		content?: string;
	}

	let { title, content }: Props = $props();
</script>

<div class="alert alert-info flex flex-col p-2">
	<span class="text-lg">{title}</span>
	{#if content}
		<div class="border-t pt-4">
			<MultilineMacro class="block" element="span" text={content} />
		</div>
	{/if}
</div>
