<script lang="ts">
	import Collapse from '$lib/atoms/collapse.svelte';
	import MultilineMacro from '$lib/atoms/multiline-macro.svelte';
	import { openDialog } from '$lib/components/dialog.svelte';
	import FeatDialog from '$lib/components/dialogs/feat-dialog.svelte';
	import TraitDialog from '$lib/components/dialogs/trait-dialog.svelte';
	import DragHandle from '$lib/components/icons/drag-handle.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';
	import { Feat, Trait } from '$lib/data';
	import { getChar } from '$lib/data/context';
	import { t } from '$lib/i18n';
	import { macroNotify } from '$lib/utils/notes';

	const { c } = getChar();

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

	<SortableList
		bind:items={$c.feats}
		options={{
			group: 'feats',
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)',
		}}
		keyProp="id"
		class="flex flex-col gap-2"
		let:item
		let:index
	>
		<div class="flex w-full flex-row">
			<div class="drag-handle flex w-6 items-center justify-center" role="button" tabindex="0">
				<DragHandle />
			</div>
			<Collapse icon="arrow" on:contextmenu={() => openDialog(FeatDialog, { index })}>
				<span slot="title" class="text-sm font-semibold"
					>{item.name} ({$t(`feats.type.${item.type}`)})</span
				>

				<div class="flex flex-col gap-2">
					{#if item.benefits}
						<div class="divider my-0">Benefits</div>
						<MultilineMacro
							text={item.benefits}
							class="mb-4 text-justify text-sm hyphens-auto last:mb-0"
						/>
					{/if}
					{#if item.normal}
						<div class="divider my-0">Normal</div>
						<MultilineMacro
							text={item.normal}
							class="mb-4 text-justify text-sm hyphens-auto last:mb-0"
						/>
					{/if}
					{#if item.special}
						<div class="divider my-0">Special</div>
						<MultilineMacro
							text={item.special}
							class="mb-4 text-justify text-sm hyphens-auto last:mb-0"
						/>
					{/if}
				</div>
			</Collapse>
		</div>
	</SortableList>

	<div class="divider">
		<div class="flex flex-row gap-2">
			Features/Traits
			<button class="btn btn-secondary btn-xs" on:click={addTrait}>Add</button>
		</div>
	</div>

	<SortableList
		bind:items={$c.traits}
		options={{
			group: 'traits',
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)',
		}}
		keyProp="id"
		class="flex flex-col gap-2"
		let:item
		let:index
	>
		<div class="flex w-full flex-row items-stretch">
			<div class="drag-handle flex w-6 items-center justify-center" role="button" tabindex="0">
				<DragHandle />
			</div>
			<div class="flex grow flex-row items-stretch gap-2">
				<button
					class="btn btn-sm md:btn-md flex-1"
					on:click={() => macroNotify(item.name, item.description, $c)}
					on:contextmenu|preventDefault={() => openDialog(TraitDialog, { index })}
				>
					{item.name}
				</button>
				{#if item.perDay.expr}
					<button
						class="btn btn-accent btn-sm md:btn-md w-32"
						on:click={() => useTrait(index)}
						on:contextmenu|preventDefault={() => refillTrait(index)}
					>
						{item.remaining}/{item.perDay.eval($c)} per day
					</button>
				{/if}
			</div>
		</div>
	</SortableList>
</div>
