<script lang="ts">
	import { getChar } from '$lib/data/context';
	import { calculateNode } from '$lib/macro/evaluate';
	import { parse } from '$lib/macro/parser';

	const { c } = getChar();

	export let expr: string;

	$: node = parse(expr);
	$: result = calculateNode(node, $c);
</script>

{result}
