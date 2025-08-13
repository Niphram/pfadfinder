<script lang="ts">
	import { onMount } from 'svelte';

	import { Class, SAVE_KEYS } from '$lib/data';
	import { t } from '$lib/i18n';
	import type { CharProxy } from '$lib/serde/proxy';

	import { title } from '$lib/components/dialog.svelte';
	import Input from '$lib/components/input/input.svelte';
	import Integer from '$lib/components/input/integer.svelte';
	import NumberWrapper from '$lib/components/input/number-wrapper.svelte';
	import Toggle from '$lib/components/input/toggle.svelte';

	interface Props {
		value: CharProxy<Class>;
		ondelete: () => void;
	}

	let { value, ondelete }: Props = $props();

	let deleteConfirm = $state(false);

	onMount(() => {
		deleteConfirm = false;
	});

	function deleteClass(ev: Event) {
		if (!deleteConfirm) {
			deleteConfirm = true;
			ev.preventDefault();
		} else {
			ondelete();
		}
	}

	$title = 'Class';
</script>

<div class="flex flex-col gap-2">
	<div class="flex flex-row gap-2">
		<Input name="className" label="Name" placeholder="Type here" bind:value={value.name} />

		<NumberWrapper value={value.$level} name="classLevel" label="Level" />
	</div>

	<Toggle name="favoredClass" label="Favored Class" bind:checked={value.favored} />

	<div class="grid grid-cols-2 gap-4">
		<NumberWrapper value={value.$bab} name="bab" label="Base Attack Bonus" />
		<NumberWrapper value={value.$speed} name="classSpeed" label="Speed" />
	</div>
	<div class="grid grid-cols-3 gap-2">
		{#each SAVE_KEYS as key (key)}
			<NumberWrapper value={value.$[key]} name="class{key}" label={$t(`saves.${key}.full`)} />
		{/each}
	</div>
	<div class="divider mb-0">Ranks</div>
	<div class="flex flex-row gap-2">
		<NumberWrapper value={value.$levelRanks} name="classRanksLevel" label="Ranks/Level" />
		<NumberWrapper value={value.$miscRanks} name="classRanksMisc" label="Misc Ranks" />
	</div>

	<button
		onclick={deleteClass}
		class={['btn btn-error mt-4 w-max self-center uppercase', !deleteConfirm && 'btn-outline']}
		>{deleteConfirm ? 'Are you sure?' : 'Delete'}</button
	>
</div>
