<script lang="ts">
	import { base } from '$app/paths';

	const { data } = $props();
</script>

<article class="prose p-4 select-text">
	<p>
		&lt;
		<a href="{base}/">Back to home</a>
	</p>

	<h1>Changelogs</h1>

	<ul>
		{#each data.changelogs as { date } (date)}
			<li><a href="{base}/changelog/{date}">{date}</a></li>
		{/each}
	</ul>
</article>
