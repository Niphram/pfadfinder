<script lang="ts">
	import { t } from '$lib/i18n';

	import { title } from '$lib/components/dialog.svelte';
	import Input from '$lib/components/input/input.svelte';
	import MacroNumber from '$lib/components/input/macro-number.svelte';

	import { ABILITY_KEYS, getChar } from '$lib/data';

	const { c } = $derived(getChar());

	$title = 'Race';
</script>

<div class="flex flex-col gap-2">
	<Input name="raceName" label="Name" placeholder="Race" value={c.race.$.name} />

	{#each ABILITY_KEYS as key (key)}
		<MacroNumber
			value={c.race.$[key]}
			name="race{key}"
			label={$t(`abilities.${key}.full`)}
			placeholder={$t(`abilities.${key}.short`)}
		/>
	{/each}

	<MacroNumber value={c.race.$.speed} name="raceSpeed" label="Speed" placeholder="Speed" />
</div>
