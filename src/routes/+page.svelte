<script lang="ts">
	import { t } from '$lib/i18n';
	import { c, dirty } from '$lib/state/character';

	import { openDialog } from '$lib/components/dialog.svelte';

	import AbilitiesPage from '$lib/pages/abilities-page.svelte';
	import CharacterPage from '$lib/pages/character-page.svelte';
	import CombatPage from '$lib/pages/combat-page.svelte';
	import SkillsPage from '$lib/pages/skills-page.svelte';
	import SpellsPage from '$lib/pages/spells-page.svelte';

	import HpButton from '$lib/components/buttons/hp-button.svelte';

	import CharacterInfoDialog from '$lib/components/dialogs/character-info-dialog.svelte';
	import HpDialog from '$lib/components/dialogs/hp-dialog.svelte';
	import PageDialog from '$lib/components/dialogs/page-dialog.svelte';

	const pages = [
		{ key: 'abilities', component: AbilitiesPage },
		{ key: 'combat', component: CombatPage },
		{ key: 'skills', component: SkillsPage },
		{ key: 'spells', component: SpellsPage },
		{ key: 'character', component: CharacterPage }
	] as const;
</script>

<svelte:head>
	<title>
		{$c.name}{$dirty ? ` (${$t('texts.general.unsaved')})` : ''}
	</title>
</svelte:head>

<div class="flex h-screen flex-col">
	<div class="sticky top-0 z-40 w-full bg-base-200 drop-shadow-xl">
		<div class="flex flex-row items-stretch gap-2 p-2 align-middle">
			<button class="flex-grow text-left" on:click={() => openDialog(CharacterInfoDialog, {})}>
				<div class="flex flex-col">
					<p class="text-lg font-bold">
						{$c.name} <span class="text-sm font-normal">(Lvl. {$c.classes.levels})</span>
					</p>
					<span class="text-sm">
						{$c.classes.list.map((c) => `${c.name} ${c.level}`).join(', ')}
					</span>
				</div>
			</button>
			<HpButton on:click={() => openDialog(HpDialog, {})} />
		</div>
	</div>

	<div
		class="flex flex-grow snap-x snap-mandatory flex-row flex-nowrap divide-x overflow-x-scroll scroll-smooth"
	>
		{#each pages as { key, component } (key)}
			<div id={key} class="w-screen flex-none snap-center snap-always overflow-y-scroll p-4">
				<svelte:component this={component} />
				<div class="h-16" />
			</div>
		{/each}
	</div>
</div>

<!-- Floating Action Button -->

<div class="fixed bottom-4 right-4">
	<button class="btn btn-circle btn-primary" on:click={() => openDialog(PageDialog, {})}>
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
