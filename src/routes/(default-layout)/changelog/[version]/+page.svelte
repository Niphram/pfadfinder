<script lang="ts">
	import { resolve } from '$app/paths';

	import Container from '#lib/atoms/container.svelte';

	const { data } = $props();

	/* eslint svelte/no-at-html-tags: "off" */
</script>

<svelte:head>
	<title>{data.title} - Pfadfinder</title>
</svelte:head>

<Container>
	<article class="prose w-full max-w-none select-text">
		<p>
			<a href={resolve('changelog')}>Back to changelogs</a>
		</p>

		{@html data.changelogHtml}
	</article>
</Container>
