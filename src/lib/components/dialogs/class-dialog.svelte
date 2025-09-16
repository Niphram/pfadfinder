<script lang="ts">
	import { onMount } from 'svelte';

	import { t } from '$lib/i18n';

	import { title } from '$lib/components/dialog.svelte';
	import Input from '$lib/components/input/input.svelte';
	import Integer from '$lib/components/input/integer.svelte';
	import Toggle from '$lib/components/input/toggle.svelte';

	import { getChar, SAVE_KEYS } from '$lib/data';

	interface Props {
		classIndex: number;
	}

	let { classIndex }: Props = $props();

	const { c } = $derived(getChar());

	let deleteConfirm = $state(false);

	onMount(() => {
		deleteConfirm = false;
	});

	function deleteClass(ev: Event) {
		if (!deleteConfirm) {
			deleteConfirm = true;
			ev.preventDefault();
		} else {
			c.classes.list.splice(classIndex, 1);
		}
	}

	$title = 'Class';
</script>

<div class="flex flex-col gap-2">
	{#if classIndex < c.classes.list.length}
		<div class="flex flex-row gap-2">
			<Input
				name="className"
				label="Name"
				placeholder="Type here"
				bind:value={c.classes.list[classIndex].name}
			/>

			<Integer
				bind:value={c.classes.list[classIndex].level}
				name="classLevel"
				label="Level"
				noNegatives
				noZero
			/>
		</div>

		<Toggle
			name="favoredClass"
			label="Favored Class"
			bind:checked={c.classes.list[classIndex].favored}
		/>

		<div class="grid grid-cols-2 gap-4">
			<Integer bind:value={c.classes.list[classIndex].bab} name="bab" label="Base Attack Bonus" />
			<Integer bind:value={c.classes.list[classIndex].speed} name="classSpeed" label="Speed" />
		</div>
		<div class="grid grid-cols-3 gap-2">
			{#each SAVE_KEYS as key (key)}
				<Integer
					bind:value={c.classes.list[classIndex][key]}
					name="class{key}"
					label={$t(`saves.${key}.full`)}
				/>
			{/each}
		</div>
		<div class="divider mb-0">Ranks</div>
		<div class="flex flex-row gap-2">
			<Integer
				bind:value={c.classes.list[classIndex].levelRanks}
				name="classRanksLevel"
				label="Ranks/Level"
			/>
			<Integer
				bind:value={c.classes.list[classIndex].miscRanks}
				name="classRanksMisc"
				label="Misc Ranks"
			/>
		</div>
	{/if}

	<button
		onclick={deleteClass}
		class="btn btn-error mt-4 w-max self-center uppercase"
		class:btn-outline={!deleteConfirm}>{deleteConfirm ? 'Are you sure?' : 'Delete'}</button
	>
</div>
