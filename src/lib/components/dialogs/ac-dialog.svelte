<script>
	import { ABILITY_KEYS, c } from '$lib/data';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';

	$title = 'Armor Class';
</script>

<div class="form-control w-full">
	<label for="acPrimaryAbility" class="label pb-0">
		<span class="label-text">Primary Ability</span>
	</label>
	<select
		name="acPrimaryAbility"
		class="select select-bordered w-full"
		bind:value={$c.ac.primaryAbility}
	>
		{#each ABILITY_KEYS as key}
			<option value={key}>
				{$t(`abilities.${key}.full`)}
			</option>
		{/each}
	</select>
</div>

<div class="form-control w-full">
	<label for="acSecondaryAbility" class="label pb-0">
		<span class="label-text">Secondary Ability</span>
	</label>
	<select
		name="acSecondaryAbility"
		class="select select-bordered w-full"
		bind:value={$c.ac.secondaryAbility}
	>
		<option value={undefined}>None</option>
		{#each ABILITY_KEYS as key}
			<option value={key}>
				{$t(`abilities.${key}.full`)}
			</option>
		{/each}
	</select>
</div>
