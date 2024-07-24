<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { PathfinderCharacter } from './data';
	import CharacterPage from './page/character-page.svelte';
	import { openDialog } from '$lib/components/dialog.svelte';
	import PageDialog from './dialogs/page-dialog.svelte';

	$: pages = [{ key: 'character', component: CharacterPage, active: true }] as const;

	export let c: Writable<PathfinderCharacter>;
</script>

<div class="min-h-screen">
	<div class="sticky top-0 z-40 w-full bg-base-200 drop-shadow-xl">
		<div class="flex flex-row items-stretch justify-between gap-2 p-2">
			<button class="btn btn-ghost h-auto min-w-0 flex-shrink px-2">
				<div class="flex min-w-0 flex-col">
					<div class="flex flex-row flex-nowrap items-center justify-start gap-2">
						<span class="truncate text-lg font-bold">{$c.name}</span>
						<span class="whitespace-nowrap text-sm font-normal">(Lvl. {$c.classes.levels}) </span>
					</div>
					<div class="truncate text-sm">
						{$c.classes.list.map((c) => `${c.name} ${c.level}`).join(', ')}
					</div>
				</div>
			</button>
			<button
				class="btn btn-accent flex h-auto min-h-0 flex-col justify-center gap-0 px-2 py-1 text-center"
			>
				<div class="text-xs">Hit Points</div>
				<div class="text-lg">
					{$c.hp.current}/{$c.hp.max}
					{#if $c.hp.temp > 0}
						<span class="text-blue-500"> ({$c.hp.temp})</span>
					{/if}
				</div>
			</button>
		</div>
	</div>

	<div
		class="flex h-full flex-grow snap-x snap-mandatory flex-row flex-nowrap overflow-x-scroll scroll-smooth"
	>
		{#each pages as { key, component, active } (key)}
			{#if active}
				<div id={key} class="w-full flex-none snap-center snap-always overflow-y-scroll p-4">
					<svelte:component this={component} {c} />
					<div class="h-16" />
				</div>
			{/if}
		{/each}
	</div>

	<div class="fixed bottom-4 right-4">
		<button class="btn btn-circle btn-primary" on:click={() => openDialog(PageDialog, { c })}>
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
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
		</button>
	</div>
</div>
