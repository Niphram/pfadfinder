<script lang="ts">
	import { onMount } from 'svelte';

	import { t } from '$lib/i18n';
	import Integer from '../input/integer.svelte';
	import { title } from '../dialog.svelte';
	import { SAVE_KEYS, c } from '$lib/data';

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
			<div class="form-control w-full max-w-xs">
				<label for="className" class="label pb-0">
					<span class="label-text">Name</span>
				</label>
				<input
					name="className"
					placeholder="Type here"
					class="input input-bordered w-full max-w-xs"
					bind:value={$c.classes.list[classIndex].name}
				/>
			</div>
			<Integer
				bind:value={$c.classes.list[classIndex].level}
				name="classLevel"
				label="Level"
				noNegatives
				noZero
			/>
		</div>
		<div class="form-control">
			<label class="label cursor-pointer pb-0">
				<span class="label-text">Favored Class</span>
				<input type="checkbox" class="toggle" bind:checked={$c.classes.list[classIndex].favored} />
			</label>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<Integer bind:value={$c.classes.list[classIndex].bab} name="bab" label="Base Attack Bonus" />
			<Integer bind:value={$c.classes.list[classIndex].speed} name="classSpeed" label="Speed" />
		</div>
		<div class="grid grid-cols-3 gap-2">
			{#each SAVE_KEYS as key}
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
