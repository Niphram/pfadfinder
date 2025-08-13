<script lang="ts">
	import { Class } from '$lib/data';
	import { getChar } from '$lib/data/context';

	import CaptionedButton from '$lib/components/captioned-button.svelte';
	import { openDialog } from '$lib/components/dialog.svelte';
	import ClassDialog from '$lib/components/dialogs/class-dialog.svelte';
	import RaceDialog from '$lib/components/dialogs/race-dialog.svelte';

	const { c } = $derived(getChar());

	function addClass() {
		const index = c.classes.list.$.push(new Class()) - 1;
		openDialog(ClassDialog, { value: c.classes.list[index], ondelete: () => deleteClass(index) });
	}

	function deleteClass(index: number) {
		c.classes.list.splice(index, 1);
	}
</script>

<div class="flex flex-col gap-4">
	<div class="divider">Race</div>

	<CaptionedButton
		label={c.race.name}
		caption="Race"
		oncontextmenu={() => openDialog(RaceDialog, {})}
	/>

	<div class="divider">Classes</div>

	<div class="flex flex-col gap-4">
		{#each c.classes.list as cls, classIndex (classIndex)}
			<CaptionedButton
				label={cls.name}
				caption="Level {cls.level}"
				oncontextmenu={() =>
					openDialog(ClassDialog, {
						value: cls,
						ondelete: () => deleteClass(classIndex),
					})}
			/>
		{/each}
	</div>

	<button onclick={addClass} class="btn btn-secondary self-center">Add Class</button>
</div>
