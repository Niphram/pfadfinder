<script lang="ts">
	import { computeMacroInTextStyle } from '$lib/text/macro-text-style';

	import Fieldset from './fieldset.svelte';
	import RichTextArea from './rich-text-area.svelte';

	export let value: string;

	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;

	export let rows = 10;
</script>

<Fieldset legend={label}>
	<RichTextArea bind:value {name} {placeholder} {rows} computeTextStyle={computeMacroInTextStyle} />
</Fieldset>
