<script lang="ts">
	import type { SerdeProxy } from '$lib/serde';

	import HpButton from '$lib/components/buttons/hp-button.svelte';
	import { useDialog } from '$lib/components/dialog-provider.svelte';
	import CharacterInfoDialog from '$lib/components/dialogs/character-info-dialog.svelte';
	import HpDialog from '$lib/components/dialogs/hp-dialog.svelte';
	import PageDialog from '$lib/components/dialogs/page-dialog.svelte';
	import ToastProvider from '$lib/components/toast-provider.svelte';

	import { Character, getChar, setChar } from '$lib/data';

	import AbilitiesPage from './pages/abilities-page.svelte';
	import CharacterPage from './pages/character-page.svelte';
	import CombatPage from './pages/combat-page.svelte';
	import EquipmentPage from './pages/equipment-page.svelte';
	import FeaturesTraitsPage from './pages/features-traits-page.svelte';
	import PersonaPage from './pages/persona-page.svelte';
	import SkillsPage from './pages/skills-page.svelte';
	import SpellsPage from './pages/spells-page.svelte';

	type Props = {
		state: {
			c: SerdeProxy<Character>;
			dirty: boolean;
		};
	};

	const { state }: Props = $props();

	setChar(state);

	const { openDialog } = useDialog();
	const { c } = $derived(getChar());

	let pages = $derived([
		{ key: 'abilities', component: AbilitiesPage, active: true },
		{ key: 'combat', component: CombatPage, active: true },
		{ key: 'skills', component: SkillsPage, active: true },
		{ key: 'spells', component: SpellsPage, active: c.settings.showMagicPage },
		{ key: 'features_traits', component: FeaturesTraitsPage, active: true },
		{ key: 'equipment', component: EquipmentPage, active: true },
		{ key: 'character', component: CharacterPage, active: true },
		{
			key: 'persona',
			component: PersonaPage,
			active: c.settings.usePersonaSystem,
		},
	] as const);
</script>

<ToastProvider />

<div class="flex h-dvh flex-col">
	<div class="bg-base-200 sticky top-0 z-40 w-full drop-shadow-xl">
		<div class="flex flex-row items-stretch gap-2 p-2 align-middle">
			<button
				class="grow text-left"
				onclick={() => openDialog(CharacterInfoDialog, {})}
			>
				<div class="flex flex-col">
					<p class="text-lg font-bold">
						{c.name}
						<span class="text-sm font-normal">(Lvl. {c.classes.levels})</span>
					</p>
					<span class="text-sm">
						{c.classes.list.map((c) => `${c.name} ${c.level}`).join(', ')}
					</span>
				</div>
			</button>
			<HpButton onclick={() => openDialog(HpDialog, {})} />
		</div>
	</div>

	<div
		class="flex grow snap-x snap-mandatory flex-row flex-nowrap overflow-x-scroll scroll-smooth"
	>
		{#each pages as { key, component, active } (key)}
			{#if active}
				{@const SvelteComponent = component}
				<div
					id={key}
					class="w-full flex-none snap-center snap-always overflow-y-scroll p-4"
				>
					<SvelteComponent />
					<div class="h-16"></div>
				</div>
			{/if}
		{/each}
	</div>
</div>

<!-- Floating Action Button -->

<div class="fixed right-4 bottom-4">
	<button
		aria-label="Navigation"
		class="btn btn-circle btn-primary"
		onclick={() => openDialog(PageDialog, {})}
	>
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
