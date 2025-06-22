<script lang="ts">
	import Button from '$lib/atoms/button.svelte';
	import Divider from '$lib/atoms/divider.svelte';
	import { title } from '$lib/components/dialog.svelte';
	import Fieldset from '$lib/components/input/fieldset.svelte';
	import { getChar } from '$lib/data/context';
	import { Macro } from '$lib/data/macros';
	import { Tokenizer, TokenType } from '$lib/macro/tokenizer';
	import MacroAstTree from './macro-ast-tree.svelte';

	const { c } = getChar();

	$title = 'Macro debugging';

	const testMacro = new Macro('floor(@classes.list.0.level * 5 / 6) + @int.mod + 3');
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

	function highlight(input: string) {
		const tokens = new Tokenizer(input).allTokens();

		let cursor = 0;
		let result = '';

		const TOKEN_FONT_COLORS: Record<TokenType, string> = {
			[TokenType.AT]: 'text-neutral',
			[TokenType.PERIOD]: 'text-neutral',
			[TokenType.COMMA]: 'text-neutral',
			[TokenType.DECIMAL]: 'text-accent',
			[TokenType.INTEGER]: 'text-accent',
			[TokenType.IDENTIFIER]: 'text-info',
			[TokenType.OPERATOR]: 'text-success',
			[TokenType.PARENTHESIS_LEFT]: 'text-neutral',
			[TokenType.PARENTHESIS_RIGHT]: 'text-neutral',
			[TokenType.INVALID]: 'text-error',
		};

		for (const token of tokens) {
			if (token.start > cursor)
				result += `<span class="whitespace-pre">${' '.repeat(token.start - cursor)}</span>`;

			cursor = token.end;
			result += `<span class="token ${TOKEN_FONT_COLORS[token.type]}">${token.value}</span>`;
		}

		return result;
	}

	let inputEl: HTMLInputElement;
	let outputEl: HTMLDivElement;

	function updateScroll() {
		outputEl.scrollTop = inputEl.scrollTop;
		outputEl.scrollLeft = inputEl.scrollLeft;
	}
</script>

<div class="flex flex-col gap-2">
	<Fieldset legend="Debug Macro">
		<div class="relative">
			<input
				bind:this={inputEl}
				bind:value={testMacro.expr}
				on:scroll={updateScroll}
				class="input input-bordered caret-base-content z-10 w-full bg-transparent text-transparent"
			/>

			<div class="input input-bordered absolute top-0 left-0 z-0 w-full">
				<div bind:this={outputEl} class="overflow-hidden whitespace-pre">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html highlight(testMacro.expr)}
				</div>
			</div>
		</div>
	</Fieldset>

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
