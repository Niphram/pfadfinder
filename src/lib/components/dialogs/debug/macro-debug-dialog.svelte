<script lang="ts">
	import Button from '$lib/atoms/button.svelte';
	import Divider from '$lib/atoms/divider.svelte';
	import { title } from '$lib/components/dialog.svelte';
	import Input from '$lib/components/input/input.svelte';
	import { getChar } from '$lib/data/context';
	import { Macro } from '$lib/data/macros';
	import { Tokenizer, TokenType } from '$lib/macro/tokenizer';
	import MacroAstTree from './macro-ast-tree.svelte';

	const { c } = getChar();

	$title = 'Macro debugging';

	const testMacro = new Macro('floor   (   @classes.list.0.level * 5 / 6) + @int.mod + 3');
	$: tokens = new Tokenizer(testMacro.expr).allTokens();

	const TOKEN_COLORS: Record<TokenType, string> = {
		[TokenType.AT]: 'badge-info',
		[TokenType.PERIOD]: 'badge-info',
		[TokenType.COMMA]: 'badge-neutral',
		[TokenType.DECIMAL]: 'badge-accent',
		[TokenType.INTEGER]: 'badge-accent',
		[TokenType.IDENTIFIER]: 'badge-secondary',
		[TokenType.OPERATOR]: 'badge-primary',
		[TokenType.PARENTHESIS_LEFT]: 'badge-neutral',
		[TokenType.PARENTHESIS_RIGHT]: 'badge-neutral',
		[TokenType.INVALID]: 'badge-error',
	};

	let astOpen = true;
</script>

<div class="flex flex-col gap-2">
	<Input name="testMacro" label="Debug Macro" bind:value={testMacro.expr} />

	<p>Evaluates to: {testMacro.eval($c)}</p>

	<Divider>Tokens</Divider>

	<div class="bg-base-200 flex w-full flex-row flex-wrap gap-1 rounded-md p-2">
		{#each tokens as { type, value }, i (i)}
			<div class={['tooltip badge badge-sm', TOKEN_COLORS[type]]} data-tip={type}>
				{value}
			</div>
		{/each}
	</div>

	<Divider>
		Abstract Syntax Tree
		<Button size="xs" color="neutral" on:click={(e) => (e.preventDefault(), (astOpen = !astOpen))}>
			toggle all
		</Button>
	</Divider>

	<ul class="menu menu-sm bg-base-200 w-full rounded-md">
		<li>
			<MacroAstTree node={testMacro.node} open={astOpen} />
		</li>
	</ul>
</div>

<style>
	.token {
		border: 1px solid black;
	}
</style>
