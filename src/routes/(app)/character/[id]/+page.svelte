<script lang="ts">
	import { t } from '$lib/i18n';
	import Sheet from '$lib/systems/pathfinder/sheet.svelte';

	import { getChar } from '$lib/data';

	const { c, dirty } = $derived(getChar());
</script>

<svelte:head>
	<title>
		{c.name}{dirty ? ` (${$t('texts.general.unsaved')})` : ''}
	</title>
</svelte:head>

<Sheet />
