<script lang="ts">
	import { openDialog } from '$lib/components/dialog.svelte';

	import { c, Class } from '$lib/data';

	import CaptionedButton from '$lib/components/captioned-button.svelte';

	import ClassDialog from '$lib/components/dialogs/class-dialog.svelte';
	import RaceDialog from '$lib/components/dialogs/race-dialog.svelte';

	function addClass() {
		$c.classes.list.push(new Class());
		$c.classes.list = $c.classes.list;

		openDialog(ClassDialog, { classIndex: $c.classes.list.length - 1 });
	}
</script>

<div class="flex flex-col gap-4">
	<div class="divider">Race</div>

	<CaptionedButton
		label={$c.race.name}
		caption="Race"
		on:contextmenu={() => openDialog(RaceDialog, {})}
	/>

	<div class="divider">Classes</div>

	<div class="flex flex-col gap-4">
		{#each $c.classes.list as { name, level }, classIndex}
			<CaptionedButton
				label={name}
				caption="Level {level}"
				on:contextmenu={() => openDialog(ClassDialog, { classIndex })}
			/>
		{/each}
	</div>
	<button on:click={addClass} class="btn btn-secondary self-center">Add Class</button>
</div>
