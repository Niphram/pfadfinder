<script lang="ts">
	import { Tokenizer, TokenType } from '$lib/macro/tokenizer';
	import { macro } from '$lib/serde';

	import Button from '$lib/atoms/button.svelte';
	import Divider from '$lib/atoms/divider.svelte';

	import { title } from '$lib/components/dialog.svelte';
	import MacroInteger from '$lib/components/input/macro-integer.svelte';

	import MacroAstTree from './macro-ast-tree.svelte';

	$title = 'Macro debugging';

	const testMacro = macro('floor(@classes.list.0.level * 5 / 6) + @int.mod + 3');
	const tokens = $derived(new Tokenizer(testMacro.expr).allTokens());

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

	let astOpen = $state(true);
</script>

<div class="flex flex-col gap-2">
	<MacroInteger label="Debug Macro" name="debugMacro" bind:value={testMacro.expr} alwaysCommit />

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
		<Button size="xs" color="neutral" onclick={(e) => (e.preventDefault(), (astOpen = !astOpen))}>
			toggle all
		</Button>
	</Divider>

	{#if testMacro.parseResult.ok}
		<ul class="menu menu-sm bg-base-200 w-full rounded-md">
			<li>
				<MacroAstTree node={testMacro.parseResult.value} open={astOpen} />
			</li>
		</ul>
	{:else}
		<p>Could not generate AST</p>
	{/if}
</div>
