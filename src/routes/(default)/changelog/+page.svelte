<script lang="ts">
	import { resolve } from '$app/paths';

	const { data } = $props();
</script>

<p class="text-xs opacity-30">Build {__BUILD_DATE__}</p>

<article class="prose p-4 select-text">
	<p>
		&lt;
		<a href={resolve('/')}>Back to home</a>
	</p>

	<h1>Changelogs</h1>

	<ul>
		{#each data.changelogs as { title } (title)}
			<li><a href={resolve('/(default)/changelog/[version]', { version: title })}>{title}</a></li>
		{/each}
	</ul>
</article>
