<script lang="ts">
	import { getChar } from '$lib/data/context';
	import { evalNode } from '$lib/macro/evaluate';
	import { Parser } from '$lib/macro/parser';

	interface Props {
		expr: string;
	}

	let { expr }: Props = $props();

	const { c } = getChar();

	let node = $derived(Parser.parse(expr));
	let result = $derived(evalNode(node, $c));
</script>

{result}
