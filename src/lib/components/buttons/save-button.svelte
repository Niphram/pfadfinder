<script lang="ts">
	import { t } from '$lib/i18n';
	import { c, type SaveKey } from '$lib/state';
	import { withSign } from '$lib/utils';

	import CaptionedButton from '$lib/components/captioned-button.svelte';

	export let key: SaveKey;
</script>

<CaptionedButton on:click label={withSign($c[key].mod)} caption={$t(`saves.${key}.short`)} />
