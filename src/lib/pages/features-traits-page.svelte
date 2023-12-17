<script lang="ts">
	import { openDialog } from '$lib/components/dialog.svelte';
	import FeatDialog from '$lib/components/dialogs/feat-dialog.svelte';
	import TraitDialog from '$lib/components/dialogs/trait-dialog.svelte';
	import { Feat, Trait, c } from '$lib/data';
	import { t } from '$lib/i18n';
	import { macroNotify } from '$lib/utils/notes';
	import Sortable from 'sortablejs';

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

	let featListEl: HTMLDivElement;
	$: if (featListEl)
		Sortable.create(featListEl, {
			group: 'feats',
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)',
			onUpdate({ oldIndex = 0, newIndex = 0 }) {
				$c.feats.splice(newIndex, 0, $c.feats.splice(oldIndex, 1)[0]);
				$c.feats = $c.feats;
			}
		});

	let traitListEl: HTMLDivElement;
	$: if (traitListEl)
		Sortable.create(traitListEl, {
			group: 'traits',
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)',
			onUpdate({ oldIndex = 0, newIndex = 0 }) {
				$c.traits.splice(newIndex, 0, $c.traits.splice(oldIndex, 1)[0]);
				$c.traits = $c.traits;
			}
		});
</script>

<div class="flex flex-col gap-2">
	<div class="divider">
		<div class="flex flex-row gap-2">
			Feats
			<button class="btn btn-secondary btn-xs" on:click={addFeat}>Add</button>
		</div>
	</div>

	<div class="flex flex-col gap-2" bind:this={featListEl}>
		{#each $c.feats as feat, idx (feat.id)}
			{@const featBenefits = feat.benefits ? `Benefits: ${feat.benefits}\n` : ''}
			{@const featNormal = feat.normal ? `Normal: ${feat.normal}\n` : ''}
			{@const featSpecial = feat.special ? `Special: ${feat.special}\n` : ''}

			<div class="flex w-full flex-row gap-2">
				<div class="drag-handle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
						/>
					</svg>
				</div>
				<button
					class="item btn btn-neutral btn-sm flex-1"
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

	<div class="flex flex-col gap-2" bind:this={traitListEl}>
		{#each $c.traits as trait, idx (trait.id)}
			<div class="flex w-full flex-row gap-2">
				<div class="drag-handle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
						/>
					</svg>
				</div>
				<button
					class="btn btn-neutral btn-sm flex-1"
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
