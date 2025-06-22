<script lang="ts">
	import { getChar } from '$lib/data/context';
	import { evalNode } from '$lib/macro/evaluate';
	import { Parser } from '$lib/macro/parser';
	import { Tokenizer, TokenType } from '$lib/macro/tokenizer';
	import Fieldset from './fieldset.svelte';

	const { c } = getChar();

	export let noNegatives = false;
	export let noZero = false;
	export let noPositive = false;
	export let optional = false;

	export let value: string;

	export let name: string;
	export let label: string;
	export let placeholder: string | undefined = undefined;

	let current = value;

	$: parsed = evalNode(Parser.parse(current), $c);

	$: valid =
		(!current && optional) ||
		(Number.isInteger(parsed) &&
			!(noNegatives && parsed < 0) &&
			!(noZero && parsed === 0) &&
			!(noPositive && parsed > 0));

	$: if (valid) {
		value = current;
	}

	let inputEl: HTMLInputElement;
	let renderEl: HTMLDivElement;

	function highlight(input: string) {
		const tokens = new Tokenizer(input).allTokens();

		let cursor = 0;
		let result = '';

		const TOKEN_FONT_COLORS: Record<TokenType, string> = {
			[TokenType.AT]: 'text-info',
			[TokenType.PERIOD]: 'text-success',
			[TokenType.COMMA]: 'text-base-content',
			[TokenType.DECIMAL]: 'text-base-content',
			[TokenType.INTEGER]: 'text-base-content',
			[TokenType.IDENTIFIER]: 'text-success',
			[TokenType.OPERATOR]: 'text-accent',
			[TokenType.PARENTHESIS_LEFT]: 'text-accent',
			[TokenType.PARENTHESIS_RIGHT]: 'text-accent',
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

	function updateScroll() {
		renderEl.scrollTop = inputEl.scrollTop;
		renderEl.scrollLeft = inputEl.scrollLeft;
	}
</script>

<Fieldset legend={label}>
	<div class="relative">
		<input
			bind:this={inputEl}
			{name}
			{placeholder}
			on:scroll={updateScroll}
			class="input input-bordered caret-base-content z-10 w-full bg-transparent text-transparent"
			class:input-error={!valid}
			bind:value={current}
		/>

		<div class="input input-bordered absolute top-0 left-0 z-0 w-full">
			<div bind:this={renderEl} class="overflow-hidden whitespace-pre">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html highlight(current)}
			</div>
		</div>
	</div>
</Fieldset>
