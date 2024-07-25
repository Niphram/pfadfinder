<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { ABILITY_KEYS, type PathfinderCharacter } from '../data';

	export let c: Writable<PathfinderCharacter>;
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-1 flex-col gap-4 md:flex-row">
		<div class="flex flex-grow flex-col content-stretch">
			<div class="divider">Abilities</div>
			<div class="grid grow grid-flow-row grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
				{#each ABILITY_KEYS as key (key)}
					<button class="btn flex h-auto flex-1 flex-col flex-nowrap divide-neutral">
						<span>{$c[key].total.eval($c)}</span>
						<span>{$c[key].bonus.eval($c)}</span>
						<span>{key}</span>
					</button>
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
	</div>
</div>
