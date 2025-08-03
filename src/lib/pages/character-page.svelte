<script lang="ts">
	import { openDialog } from '$lib/components/dialog.svelte';

	import { Class } from '$lib/data';

	import CaptionedButton from '$lib/components/captioned-button.svelte';

	import ClassDialog from '$lib/components/dialogs/class-dialog.svelte';
	import RaceDialog from '$lib/components/dialogs/race-dialog.svelte';
	import { getChar } from '$lib/data/context.svelte';

	const { c } = $derived(getChar());

	function addClass() {
		c.classes.$list.value.push(new Class());

		openDialog(ClassDialog, { classIndex: c.classes.list.length - 1 });
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
		{#each c.classes.list as { name, level }, classIndex (classIndex)}
			<CaptionedButton
				label={name}
				caption="Level {level}"
				oncontextmenu={() => openDialog(ClassDialog, { classIndex })}
			/>
		{/each}
	</div>
	<button onclick={addClass} class="btn btn-secondary self-center">Add Class</button>
</div>
