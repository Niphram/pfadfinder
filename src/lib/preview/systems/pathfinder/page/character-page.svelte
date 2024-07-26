<script lang="ts">
	import AbilityButton from '../components/ability-button.svelte';
	import SkillList from '../components/skill-list.svelte';
	import { ABILITY_KEYS } from '../data';
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-1 flex-col flex-wrap gap-4 md:flex-row">
		<div class="flex flex-grow flex-col content-stretch">
			<div class="divider">Abilities</div>
			<div class="grid grow grid-flow-row grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
				{#each ABILITY_KEYS as key (key)}
					<AbilityButton {key} />
				{/each}
			</div>
		</div>

		<div class="flex flex-col content-stretch">
			<div class="divider">Initiative</div>

			<div class="flex grow flex-row gap-2">
				<button class="btn flex h-auto flex-1 flex-col flex-nowrap divide-neutral">
					<span>initiative</span>
					<span>{0}</span>
					<span>{0}</span>
				</button>
			</div>
		</div>

		<div class="flex flex-col content-stretch">
			<div class="divider">Armor Class</div>

			<div class="flex flex-row gap-2">
				<button class="btn flex h-auto flex-1 flex-col flex-nowrap divide-neutral">
					<span>ac</span>
					<span>{0}</span>
					<span>{0}</span>
				</button>
				<button class="btn flex h-auto flex-1 flex-col flex-nowrap divide-neutral">
					<span>touch</span>
					<span>{0}</span>
					<span>{0}</span>
				</button>
				<button class="btn flex h-auto flex-1 flex-col flex-nowrap divide-neutral">
					<span>flat-footed</span>
					<span>{0}</span>
					<span>{0}</span>
				</button>
			</div>
		</div>

		<SkillList />
	</div>
</div>
