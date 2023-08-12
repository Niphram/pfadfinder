<script lang="ts">
	import { c } from '$lib/state';

	import { openDialog } from '$lib/components/dialog.svelte';

	import CaptionedButton from '$lib/components/captioned-button.svelte';

	import ClassDialog from '$lib/components/dialogs/class-dialog.svelte';
	import RaceDialog from '$lib/components/dialogs/race-dialog.svelte';
	import type { Class } from '$lib/state/char-types/class';

	function addClass() {
		const newClass: Class = {
			name: 'New Class',
			favored: false,
			level: 1,
			hitDice: 6,
			bab: 0,
			fort: 0,
			ref: 0,
			will: 0,
			speed: 0,
			levelRanks: 0,
			miscRanks: 0
		};

		$c.classes.list.push(newClass);
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

	<div class="grid w-full grid-cols-1 gap-2 md:grid-cols-4">
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
