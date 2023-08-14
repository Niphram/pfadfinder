<script lang="ts">
	import { c } from '$lib/data';
	import { calculateNode } from '$lib/macro/evaluate';
	import { parse } from '$lib/macro/parser';

	export let expr: string;

	$: node = parse(expr);
	$: result = calculateNode(node, $c);
</script>

{result}
