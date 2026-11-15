<script lang="ts">
	import Container from '#lib/atoms/container.svelte';

	import Appearance from './appearance.svelte';
	import Storage from './storage.svelte';
</script>

<svelte:head>
	<title>Settings - Pfadfinder</title>
</svelte:head>

<Container class="flex flex-col gap-4">
	<Appearance />

	<Storage />
</Container>
