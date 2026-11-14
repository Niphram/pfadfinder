<script lang="ts">
	import { resolve } from '$app/paths';

	import Container from '#lib/atoms/container.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>Changelogs - Pfadfinder</title>
</svelte:head>

<Container>
	<div class="prose w-full max-w-none select-text">
		<p class="text-xs opacity-30">Build {__BUILD_DATE__}</p>
		<h1>Changelogs</h1>

		<ul>
			{#each data.changelogs as { title } (title)}
				<li>
					<a
						href={resolve('/(default-layout)/changelog/[version]', {
							version: title,
						})}>{title}</a
					>
				</li>
			{/each}
		</ul>
	</div>
</Container>
