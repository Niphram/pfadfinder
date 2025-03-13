<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const character = $derived(data.character);
</script>

<h1>{$character.id} - {$character.name}</h1>
