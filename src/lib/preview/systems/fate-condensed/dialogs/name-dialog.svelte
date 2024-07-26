<script lang="ts">
	import type { Writable } from 'svelte/store';

	import { title } from '$lib/components/dialog.svelte';
	import { t } from '$lib/preview/i18n';
	import type { FateCondensedCharacter } from '../character';

	$title = $t('general.character.name');

	export let c: Writable<FateCondensedCharacter>;
</script>

<div class="form-control w-full">
	<label for="name" class="label pb-0">
		<span class="label-text">{$t('general.character.name')}</span>
	</label>
	<input name="name" class="input input-bordered w-full" bind:value={$c.name} />
</div>

<div class="form-control w-full">
	<label for="pronouns" class="label pb-0">
		<span class="label-text">{$t('general.character.pronouns')}</span>
	</label>
	<input name="pronouns" class="input input-bordered w-full" bind:value={$c.pronouns} />
</div>
