<script lang="ts">
	import { resolve } from '$app/paths';

	const { data } = $props();
	const { changelogHtml } = data;

	/* eslint svelte/no-at-html-tags: "off" */
</script>

<article class="prose mx-auto p-4 select-text">
	<p>
		&lt;
		<a href={resolve('/changelog')}>Back to changelogs</a>
	</p>

	{@html changelogHtml}
</article>
