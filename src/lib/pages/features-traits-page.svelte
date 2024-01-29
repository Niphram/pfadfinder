<script lang="ts">
	import Button from '$lib/atoms/button.svelte';
	import Collapse from '$lib/atoms/collapse.svelte';
	import Divider from '$lib/atoms/divider.svelte';
	import Column from '$lib/atoms/layout/column.svelte';
	import Row from '$lib/atoms/layout/row.svelte';
	import MultilineMacro from '$lib/atoms/multiline-macro.svelte';
	import { openDialog } from '$lib/components/dialog.svelte';
	import FeatDialog from '$lib/components/dialogs/feat-dialog.svelte';
	import TraitDialog from '$lib/components/dialogs/trait-dialog.svelte';
	import DragHandle from '$lib/components/icons/drag-handle.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';
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

<Column gap="lg">
	<Divider>
		Feats
		<button class="btn btn-secondary btn-xs" on:click={addFeat}>Add</button>
	</Divider>

	<SortableList
		bind:items={$c.feats}
		options={{
			group: 'feats',
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)'
		}}
		keyProp="id"
		class="flex flex-col gap-2"
		let:item
		let:index
	>
		<Row>
			<div class="drag-handle ml-2 flex w-6 items-center justify-center" role="button" tabindex="0">
				<DragHandle />
			</div>

			<Collapse icon="arrow" on:contextmenu={() => openDialog(FeatDialog, { index })}>
				<span slot="title" class="text-sm font-semibold">
					{item.name} ({$t(`feats.type.${item.type}`)})
				</span>

				<Column gap="md">
					{#if item.benefits}
						<Divider>Benefits</Divider>
						<MultilineMacro
							text={item.benefits}
							class="hyphens-auto text-justify text-sm last:mb-0"
						/>
					{/if}
					{#if item.normal}
						<Divider>Normal</Divider>
						<MultilineMacro
							text={item.normal}
							class="hyphens-auto text-justify text-sm last:mb-0"
						/>
					{/if}
					{#if item.special}
						<Divider>Special</Divider>
						<MultilineMacro
							text={item.special}
							class="hyphens-auto text-justify text-sm last:mb-0"
						/>
					{/if}
				</Column>
			</Collapse>
		</Row>
	</SortableList>

	<Divider>
		Features/Traits
		<button class="btn btn-secondary btn-xs" on:click={addTrait}>Add</button>
	</Divider>

	<SortableList
		bind:items={$c.traits}
		options={{
			group: 'traits',
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)'
		}}
		keyProp="id"
		class="flex flex-col gap-2"
		let:item
		let:index
	>
		<Row>
			<div class="drag-handle ml-2 flex w-6 items-center justify-center" role="button" tabindex="0">
				<DragHandle />
			</div>

			<Row gap="md" class="grow">
				<button
					class="btn btn-sm grow md:btn-md"
					on:click={() => macroNotify(item.name, item.description, $c)}
					on:contextmenu|preventDefault={() => openDialog(TraitDialog, { index })}
				>
					{item.name}
				</button>

				{#if item.perDay.expr}
					<button
						class="btn btn-accent btn-sm w-32 md:btn-md"
						on:click={() => useTrait(index)}
						on:contextmenu|preventDefault={() => refillTrait(index)}
					>
						{item.remaining}/{item.perDay.eval($c)} per day
					</button>
				{/if}
			</Row>
		</Row>
	</SortableList>
</Column>
