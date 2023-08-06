<script lang="ts">
	import { c } from '$lib/state';
	import { withSign } from '$lib/utils';

	import CaptionedButton from '$lib/components/captioned-button.svelte';
</script>

<CaptionedButton on:click label={withSign($c.init)} caption="Initiative" />
