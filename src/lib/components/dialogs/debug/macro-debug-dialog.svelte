<script>
	import Button from '$lib/atoms/button.svelte';
	import Divider from '$lib/atoms/divider.svelte';
	import { title } from '$lib/components/dialog.svelte';
	import Input from '$lib/components/input/input.svelte';
	import { c } from '$lib/data';
	import { Macro } from '$lib/data/macros';
	import MacroAstTree from './macro-ast-tree.svelte';

	$title = 'Macro debugging';

	const testMacro = new Macro('floor(@classes.list.0.level * 5 / 6) + @int.mod + 3');

	let astOpen = true;
</script>

<div class="flex flex-col gap-2">
	<Input name="testMacro" label="Debug Macro" bind:value={testMacro.expr} />

	<p>Evaluates to: {testMacro.eval($c)}</p>

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
