<script lang="ts">
	import { onMount } from 'svelte';

	import { t } from '$lib/i18n';
	import Integer from '../input/integer.svelte';
	import { title } from '../dialog.svelte';
	import { SAVE_KEYS } from '$lib/data';
	import Input from '../input/input.svelte';
	import Toggle from '../input/toggle.svelte';
	import { getChar } from '$lib/data/context';

	const { c } = getChar();

	export let classIndex: number;

	let deleteConfirm = false;

	onMount(() => {
		deleteConfirm = false;
	});

	function deleteClass(ev: Event) {
		if (!deleteConfirm) {
			deleteConfirm = true;
			ev.preventDefault();
		} else {
			$c.classes.list.splice(classIndex, 1);
			$c.classes.list = $c.classes.list;
		}
	}

	$title = 'Class';
</script>

<div class="flex flex-col gap-2">
	{#if classIndex < $c.classes.list.length}
		<div class="flex flex-row gap-2">
			<Input
				name="className"
				label="Name"
				placeholder="Type here"
				bind:value={$c.classes.list[classIndex].name}
			/>

			<Integer
				bind:value={$c.classes.list[classIndex].level}
				name="classLevel"
				label="Level"
				noNegatives
				noZero
			/>
		</div>

		<Toggle
			name="favoredClass"
			label="Favored Class"
			bind:checked={$c.classes.list[classIndex].favored}
		/>

		<div class="grid grid-cols-2 gap-4">
			<Integer bind:value={$c.classes.list[classIndex].bab} name="bab" label="Base Attack Bonus" />
			<Integer bind:value={$c.classes.list[classIndex].speed} name="classSpeed" label="Speed" />
		</div>
		<div class="grid grid-cols-3 gap-2">
			{#each SAVE_KEYS as key (key)}
				<Integer
					bind:value={$c.classes.list[classIndex][key]}
					name="class{key}"
					label={$t(`saves.${key}.full`)}
				/>
			{/each}
		</div>
		<div class="divider mb-0">Ranks</div>
		<div class="flex flex-row gap-2">
			<Integer
				bind:value={$c.classes.list[classIndex].levelRanks}
				name="classRanksLevel"
				label="Ranks/Level"
			/>
			<Integer
				bind:value={$c.classes.list[classIndex].miscRanks}
				name="classRanksMisc"
				label="Misc Ranks"
			/>
		</div>
	{/if}

	<button
		on:click={deleteClass}
		class="btn btn-error mt-4 w-max self-center uppercase"
		class:btn-outline={!deleteConfirm}>{deleteConfirm ? 'Are you sure?' : 'Delete'}</button
	>
</div>
