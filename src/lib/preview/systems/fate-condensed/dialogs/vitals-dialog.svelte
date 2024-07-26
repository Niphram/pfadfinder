<script lang="ts">
	import type { Writable } from 'svelte/store';

	import { title } from '$lib/components/dialog.svelte';
	import Select from '$lib/preview/atoms/select.svelte';
	import { t } from '$lib/preview/i18n';
	import type { FateCondensedCharacter } from '../character';

	$title = $t('fate_condensed.vitals');

	export let c: Writable<FateCondensedCharacter>;

	$: physical_error = !$c.skills.find((s) => s.name === $c.physical_stress_skill);
	$: mental_error = !$c.skills.find((s) => s.name === $c.mental_stress_skill);
</script>

<Select
	name="physical_skill"
	options={$c.skills}
	label="Physical Skill"
	bind:value={$c.physical_stress_skill}
	error={physical_error}
	let:option
>
	<option value={option.name}>{option.name || $t('fate_condensed.unnamed_skill')}</option>
</Select>

<Select
	name="mental_skill"
	options={$c.skills}
	label="Mental Skill"
	bind:value={$c.mental_stress_skill}
	error={mental_error}
	let:option
>
	<option value={option.name}>{option.name || $t('fate_condensed.unnamed_skill')}</option>
</Select>
