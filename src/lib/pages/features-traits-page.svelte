<script lang="ts">
	import { openDialog } from '$lib/components/dialog.svelte';
	import FeatDialog from '$lib/components/dialogs/feat-dialog.svelte';
	import TraitDialog from '$lib/components/dialogs/trait-dialog.svelte';
	import { Feat, Trait, c } from '$lib/data';
	import { t } from '$lib/i18n';
	import { macroNotify } from '$lib/utils/notes';

	function addFeat() {
		$c.feats.push(new Feat());
		$c.feats = $c.feats;

		openDialog(FeatDialog, { index: $c.feats.length - 1 });
	}

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
			Feats
			<button class="btn btn-secondary btn-xs" on:click={addFeat}>Add</button>
		</div>
	</div>

	<div class="flex flex-col gap-2">
		{#each $c.feats as feat, idx (idx)}
			{@const featBenefits = feat.benefits ? `Benefits: ${feat.benefits}\n` : ''}
			{@const featNormal = feat.normal ? `Normal: ${feat.normal}\n` : ''}
			{@const featSpecial = feat.special ? `Special: ${feat.special}\n` : ''}

			<div class="flex w-full flex-row gap-2">
				<button
					class="btn btn-sm flex-1"
					on:click={() => macroNotify(feat.name, featBenefits + featNormal + featSpecial, $c)}
					on:contextmenu|preventDefault={() => openDialog(FeatDialog, { index: idx })}
				>
					{feat.name} ({$t(`feats.type.${feat.type}`)})
				</button>
			</div>
		{/each}
	</div>

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
