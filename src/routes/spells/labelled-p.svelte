<script lang="ts">
	export let label: string;
	export let content: string | undefined;
</script>

{#if content}
	<p><span class="font-bold">{label}</span> {content}</p>
{/if}
