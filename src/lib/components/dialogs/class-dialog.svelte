<script lang="ts">
	import { onMount } from 'svelte';

	import { t } from '$lib/i18n';
	import { c, saveKeys } from '$lib/state';

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
			$c.classes.classes.splice(classIndex, 1);
			$c.classes.classes = $c.classes.classes;
		}
	}
</script>

<div class="flex flex-col gap-2">
	<h3 class="text-lg font-bold">Class</h3>

	{#if classIndex < $c.classes.classes.length}
		<div class="flex flex-row gap-2">
			<div class="form-control w-full max-w-xs">
				<label for="className" class="label">
					<span class="label-text">Name</span>
				</label>
				<input
					name="className"
					placeholder="Type here"
					class="input input-bordered w-full max-w-xs"
					bind:value={$c.classes.classes[classIndex].name}
				/>
			</div>
			<div class="form-control w-16 max-w-xs">
				<label for="classLevel" class="label justify-center">
					<span class="label-text">Level</span>
				</label>
				<input
					name="classLevel"
					type="number"
					placeholder="Type here"
					class="input input-bordered w-full max-w-xs text-center"
					bind:value={$c.classes.classes[classIndex].level}
				/>
			</div>
		</div>
		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text">Favored Class</span>
				<input
					type="checkbox"
					class="toggle"
					bind:checked={$c.classes.classes[classIndex].favored}
				/>
			</label>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="form-control w-full max-w-xs">
				<label for="className" class="label justify-center">
					<span class="label-text">Base Attack Bonus</span>
				</label>
				<input
					name="className"
					type="number"
					placeholder="Type here"
					class="input input-bordered w-full max-w-xs text-center"
					bind:value={$c.classes.classes[classIndex].bab}
				/>
			</div>
			<div class="form-control w-full max-w-xs">
				<label for="className" class="label justify-center">
					<span class="label-text">Speed</span>
				</label>
				<input
					name="className"
					type="number"
					placeholder="Type here"
					class="input input-bordered w-full max-w-xs text-center"
					bind:value={$c.classes.classes[classIndex].speed}
				/>
			</div>
		</div>
		<div class="grid grid-cols-3 gap-2">
			{#each saveKeys as key}
				<div class="form-control w-full max-w-xs">
					<label for="class{key}" class="label justify-center">
						<span class="label-text">{$t(`saves.${key}.full`)}</span>
					</label>
					<input
						name="class{key}"
						type="number"
						placeholder="Type here"
						class="input input-bordered w-full max-w-xs text-center"
						bind:value={$c.classes.classes[classIndex][key]}
					/>
				</div>
			{/each}
		</div>
		<div class="divider mb-0">Ranks</div>
		<div class="flex flex-row gap-2">
			<div class="form-control">
				<label for="classRanksPerLeve" class="label justify-center">
					<span class="label-text">Ranks/Level</span>
				</label>
				<input
					name="classRanksPerLeve"
					placeholder="Ranks"
					class="input input-bordered w-full text-center"
					bind:value={$c.classes.classes[classIndex].ranks}
				/>
			</div>
			<div class="form-control">
				<label for="classRanksMisc" class="label justify-center">
					<span class="label-text">Misc Ranks</span>
				</label>
				<input
					name="classRanksMisc"
					type="number"
					placeholder="Misc"
					class="input input-bordered w-full text-center"
					bind:value={$c.classes.classes[classIndex].ranksMisc}
				/>
			</div>
		</div>
	{/if}

	<button
		on:click={deleteClass}
		class="btn btn-error mt-4 w-max self-center uppercase"
		class:btn-outline={!deleteConfirm}
	>
		{deleteConfirm ? 'Are you sure?' : 'Delete'}
	</button>
</div>
