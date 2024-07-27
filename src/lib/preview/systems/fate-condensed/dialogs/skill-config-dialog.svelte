<script lang="ts">
	import type { Writable } from 'svelte/store';

	import { title } from '$lib/components/dialog.svelte';
	import DragHandle from '$lib/components/icons/drag-handle.svelte';
	import Divider from '$lib/preview/atoms/divider.svelte';
	import IntegerInput from '$lib/preview/atoms/integer-input.svelte';
	import SortableList from '$lib/preview/components/sortable-list.svelte';
	import { t } from '$lib/preview/i18n';
	import Add from '$lib/preview/icons/add.svelte';
	import Trash from '$lib/preview/icons/trash.svelte';
	import { Skill, type FateCondensedCharacter } from '../character';

	$title = $t('fate_condensed.skills_config');

	export let c: Writable<FateCondensedCharacter>;

	function removeSkill(index: number) {
		$c.skills.splice(index, 1);
		$c.skills = $c.skills;
	}

	function addSkill() {
		$c.skills.push(new Skill(''));
		$c.skills = $c.skills;
	}
</script>

<SortableList
	class="mb-8 flex flex-col items-center gap-2"
	options={{
		group: `skills`,
		handle: '.drag-handle',
		animation: 150,
		easing: 'cubic-bezier(1, 0, 0, 1)'
	}}
	bind:items={$c.skills}
	keyProp="id"
	let:index
>
	<div slot="fallback">{$t('fate_condensed.no_skills')}</div>

	<div class="flex w-full flex-row gap-2">
		<div class="drag-handle ml-2 flex w-6 items-center justify-center" role="button" tabindex="0">
			<DragHandle />
		</div>

		<div class="form-control w-full">
			<input
				name="name"
				placeholder={$t('fate_condensed.unnamed_skill')}
				class="input input-bordered input-sm w-full"
				bind:value={$c.skills[index].name}
			/>
		</div>

		<div class="w-32">
			<IntegerInput name="bonus" min={0} max={10} bind:value={$c.skills[index].bonus} small />
		</div>

		<button
			class="btn btn-square btn-warning btn-sm text-warning-content"
			on:click|preventDefault={() => removeSkill(index)}
		>
			<Trash class="size-5" />
		</button>
	</div>
</SortableList>

<Divider>
	<button class="btn btn-circle btn-primary btn-sm" on:click|preventDefault={addSkill}>
		<Add class="size-6" />
	</button>
</Divider>
