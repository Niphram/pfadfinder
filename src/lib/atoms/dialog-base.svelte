<script lang="ts">
	import { type Snippet } from 'svelte';

	import { t } from '$lib/i18n';

	type Props = {
		title?: string;
		children: Snippet;
	};

	const { title, children }: Props = $props();
</script>

<form
	method="dialog"
	class="modal-box h-full max-h-none w-full max-w-none rounded-none pt-16 md:h-min md:max-h-[calc(100vh-5em)] md:max-w-lg md:rounded-md"
>
	<div
		class="bg-base-200 fixed top-0 left-0 flex h-12 w-full flex-row items-center px-4"
	>
		<div class="text-xl font-bold">{title ?? ''}</div>
		<button class="btn btn-circle btn-ghost btn-sm ml-auto">✕</button>
	</div>

	{@render children()}
</form>
<form method="dialog" class="modal-backdrop">
	<button>{$t('texts.general.close')}</button>
</form>
