<script lang="ts">
	import { openDialog } from '$lib/components/dialog.svelte';
	import TraitDialog from '$lib/components/dialogs/trait-dialog.svelte';
	import { Trait, c } from '$lib/data';
	import { macroNotify } from '$lib/utils/notes';

	function addTrait() {
		$c.traits.push(new Trait());
		$c.traits = $c.traits;

		openDialog(TraitDialog, { index: $c.traits.length - 1 });
	}

	function useTrait(index: number) {
		if ($c.traits[index].remaining > 0) $c.traits[index].remaining--;
	}

	function refillTrait(index: number) {
		if ($c.traits[index].perDay.expr) {
			$c.traits[index].remaining = $c.traits[index].perDay.eval($c);
		}
	}
</script>

<div class="flex flex-col gap-2">
	<div class="divider">
		<div class="flex flex-row gap-2">
			Features/Traits
			<button class="btn btn-secondary btn-xs" on:click={addTrait}>Add</button>
		</div>
	</div>

	<div class="flex flex-col gap-2">
		{#each $c.traits as trait, idx (idx)}
			<div class="flex w-full flex-row gap-2">
				<button
					class="btn btn-sm flex-1"
					on:click={() => macroNotify(trait.name, trait.description, $c)}
					on:contextmenu|preventDefault={() => openDialog(TraitDialog, { index: idx })}
				>
					{trait.name}
				</button>
				{#if trait.perDay.expr}
					<button
						class="btn btn-accent btn-sm w-32"
						on:click={() => useTrait(idx)}
						on:contextmenu|preventDefault={() => refillTrait(idx)}
					>
						{trait.remaining}/{trait.perDay.eval($c)} per day
					</button>
				{/if}
			</div>
		{/each}
	</div>
</div>
