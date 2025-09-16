<script lang="ts">
	import Self from './macro-ast-tree.svelte';

	import { getChar } from '$lib/data/context';
	import { AstNodeType, type AstNode } from '$lib/macro/ast';
	import { evalNode } from '$lib/macro/evaluate';

	const { c } = $derived(getChar());

	interface Props {
		node: AstNode | undefined;
		open?: boolean;
		prefix?: string;
	}

	let { node, open = true, prefix = '' }: Props = $props();

	const NODE_TYPES = {
		[AstNodeType.Error]: 'Error',
		[AstNodeType.Constant]: 'Constant Expression',
		[AstNodeType.Attribute]: 'Attribute Expression',
		[AstNodeType.Unary]: 'Unary Expression',
		[AstNodeType.Binary]: 'Binary Expression',
		[AstNodeType.Func]: 'Function Expression',
	};

	const OP_TYPES = {
		'+': 'add',
		'-': 'subtract',
		'*': 'multiply',
		'/': 'divide',
		'%': 'modulus',
	};
</script>

{#if node}
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
			{#if node.type === AstNodeType.Constant}
				<li><p>Value: {node.constant}</p></li>
			{:else if node.type === AstNodeType.Attribute}
				<li><p>Path: {node.path.join('.')} (= {evalNode(node, c)})</p></li>
			{:else if node.type === AstNodeType.Unary}
				<li><p>Operator: {OP_TYPES[node.op]}</p></li>
				<li><Self {open} prefix="Value: " node={node.node}></Self></li>
			{:else if node.type === AstNodeType.Binary}
				<li><p>Operator: {OP_TYPES[node.op]}</p></li>
				<li><Self {open} prefix="Left: " node={node.left}></Self></li>
				<li><Self {open} prefix="Right: " node={node.right}></Self></li>
			{:else if node.type === AstNodeType.Func}
				<li><p>Type: {node.func ?? 'None (Just parentheses)'}</p></li>
				{#each node.nodes as funcNode, i (i)}
					<li>
						<Self {open} prefix="Arg {i}: " node={funcNode}></Self>
					</li>
				{/each}
			{/if}
		</ul>
	</details>
{:else}
	No input
{/if}
