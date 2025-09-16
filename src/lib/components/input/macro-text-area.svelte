<script lang="ts">
	import { computeMacroInTextStyle } from '$lib/text/macro-text-style';

	import Fieldset from '$lib/components/input/fieldset.svelte';
	import RichTextArea from '$lib/components/input/rich-text-area.svelte';

	interface Props {
		value: string;
		name: string;
		label?: string | undefined;
		placeholder?: string | undefined;
		rows?: number;
	}

	let { value = $bindable(), name, label, placeholder, rows = 10 }: Props = $props();
</script>

<Fieldset legend={label}>
	<RichTextArea bind:value {name} {placeholder} {rows} computeTextStyle={computeMacroInTextStyle} />
</Fieldset>
