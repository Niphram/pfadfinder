<script lang="ts">
	import type { LayoutProps } from './$types';

	import { t } from '$lib/i18n';
	import { charProxy } from '$lib/serde/proxy';
	import { observeMutations, throttle_fe } from '$lib/utils';

	import Status from '$lib/atoms/status.svelte';

	import Dialog from '$lib/components/dialog.svelte';
	import ToastProvider from '$lib/components/toast-provider.svelte';

	import type { Character } from '$lib/data';
	import { setChar } from '$lib/data';

	const { data, children }: LayoutProps = $props();

	const mutationCallback = (char: Character) => {
		state.dirty = true;
		throttledSave(char);
	};

	const throttledSave = throttle_fe(async (char: Character) => {
		await data.db.saveCharacter(char);
		state.dirty = false;
	}, 500);

	const state = $state({
		c: charProxy(observeMutations(data.character, mutationCallback)),
		dirty: false,
	});

	setChar(state);
</script>

<div class="print:hidden">
	<div
		class={[
			'pointer-events-none fixed bottom-4 left-4 z-50 flex flex-row items-center gap-2 opacity-0 transition-opacity duration-500',
			state.dirty && 'opacity-100',
		]}
	>
		<Status color="info" ping />
		<p class="text-xs opacity-50">{$t('texts.general.saving')}</p>
	</div>

	<Dialog />
	<ToastProvider />

	<div class="h-screen w-screen">
		{@render children()}
	</div>
</div>
