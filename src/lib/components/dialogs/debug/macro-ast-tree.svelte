<script lang="ts">
	import { getChar } from '$lib/data/context';
	import { calculateNode } from '$lib/macro/evaluate';
	import { NodeType, type Node } from '$lib/macro/parser';

	const { c } = getChar();

	export let node: Node;

	export let open = true;

	export let prefix: string = '';

	const NODE_TYPES = {
		[NodeType.Error]: 'Error',
		[NodeType.Constant]: 'Constant Expression',
		[NodeType.Attribute]: 'Attribute Expression',
		[NodeType.Unary]: 'Unary Expression',
		[NodeType.Binary]: 'Binary Expression',
		[NodeType.Func]: 'Function Expression'
	};

	const OP_TYPES = {
		'+': 'add',
		'-': 'subtract',
		'*': 'multiply',
		'/': 'divide',
		'%': 'modulus'
	};
</script>

<details {open}>
	<summary>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-4"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
			/>
		</svg>
		{prefix}{NODE_TYPES[node.type]}
	</summary>
	<ul>
		{#if node.type === NodeType.Error}
			<li><p>{node.message}</p></li>
		{:else if node.type === NodeType.Constant}
			<li><p>Value: {node.constant}</p></li>
		{:else if node.type === NodeType.Attribute}
			<li><p>Path: {node.path.join('.')} (= {calculateNode(node, $c)})</p></li>
		{:else if node.type === NodeType.Unary}
			<li><p>Operator: {OP_TYPES[node.op]}</p></li>
			<li><svelte:self {open} prefix="Value: " node={node.node}></svelte:self></li>
		{:else if node.type === NodeType.Binary}
			<li><p>Operator: {OP_TYPES[node.op]}</p></li>
			<li><svelte:self {open} prefix="Left: " node={node.left}></svelte:self></li>
			<li><svelte:self {open} prefix="Right: " node={node.right}></svelte:self></li>
		{:else if node.type === NodeType.Func}
			<li><p>Type: {node.func ?? 'None (Just parentheses)'}</p></li>
			{#each node.nodes as funcNode, i (i)}
				<li>
					<svelte:self {open} prefix="Arg {i}: " node={funcNode}></svelte:self>
				</li>
			{/each}
		{/if}
	</ul>
</details>
