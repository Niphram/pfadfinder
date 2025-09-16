<script lang="ts">
	import { t } from '$lib/i18n';

	import { title } from '$lib/components/dialog.svelte';
	import Input from '$lib/components/input/input.svelte';
	import MacroInteger from '$lib/components/input/macro-integer.svelte';

	import { ABILITY_KEYS, getChar } from '$lib/data';

	const { c } = $derived(getChar());

	$title = 'Race';
</script>

<div class="flex flex-col gap-2">
	<Input name="raceName" label="Name" placeholder="Race" bind:value={c.race.name} />

	{#each ABILITY_KEYS as key (key)}
		<MacroInteger
			bind:value={c.race[`$${key}`].expr}
			name="race{key}"
			label={$t(`abilities.${key}.full`)}
			placeholder={$t(`abilities.${key}.short`)}
		/>
	{/each}

	<MacroInteger
		bind:value={c.race.$speed.expr}
		name="raceSpeed"
		label="Speed"
		placeholder="Speed"
	/>
</div>
