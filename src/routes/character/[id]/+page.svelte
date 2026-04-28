<script lang="ts">
	import { untrack } from 'svelte';

	import type { PageProps } from './$types';

	import { t } from '$lib/i18n';
	import { charProxy } from '$lib/serde';
	import type { BaseCharacter } from '$lib/systems/character';
	import Sheet from '$lib/systems/pathfinder/sheet.svelte';
	import { observeMutations } from '$lib/utils/mutation-observer';
	import { throttle_fe } from '$lib/utils/throttle';

	import Status from '$lib/atoms/status.svelte';

	const { data }: PageProps = $props();

	const mutationCallback = (char: BaseCharacter) => {
		state.dirty = true;
		throttledSave(char);
	};

	const throttledSave = throttle_fe(async (char: BaseCharacter) => {
		await data.db.saveCharacter(char);
		state.dirty = false;
	}, 500);

	const state = $state({
		c: charProxy(
			observeMutations(
				untrack(() => data.character), // Make sure this doesn't break anything
				mutationCallback,
			),
		),
		dirty: false,
	});
</script>

<svelte:head>
	<title>
		{state.c.name}{state.dirty ? ` (${$t('texts.general.unsaved')})` : ''}
	</title>
</svelte:head>

<div
	class={[
		'pointer-events-none fixed bottom-4 left-4 z-50 flex flex-row items-center gap-2 opacity-0 transition-opacity duration-500',
		state.dirty && 'opacity-100',
	]}
>
	<Status color="info" ping />
	<p class="text-xs opacity-50">{$t('texts.general.saving')}</p>
</div>

<div class="h-dvh w-dvw">
	<Sheet {state} />
</div>
