<script lang="ts">
	import { getChar } from '$lib/data/context';
	import { evalNode } from '$lib/macro/evaluate';
	import { Parser } from '$lib/macro/parser';

	const { c } = getChar();

	export let expr: string;

	$: node = Parser.parse(expr);
	$: result = evalNode(node, $c);
</script>

{result}
