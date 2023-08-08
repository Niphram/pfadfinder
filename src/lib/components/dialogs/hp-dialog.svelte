<script lang="ts">
	import { c } from '$lib/state';
	import { deriveValidated, validated } from '$lib/utils/stores';
	import { integer, positive, positive0 } from '$lib/validators/numbers';

	let [amount, amountInvalid] = validated<number>(1, integer, positive);

	function heal() {
		$c.hp.current = Math.min($c.hp.current + $amount, $c.hp.max);

		$amount = 1;
	}

	function damage() {
		const tempBuffer = $c.hp.temp - $amount;
		$c.hp.temp = Math.max(0, tempBuffer);
		$c.hp.current += Math.min(0, tempBuffer);

		$amount = 1;
	}

	const [tempHp, tempHpInvalid] = deriveValidated(c, 'hp.temp', integer, positive0);
</script>

<h3 class="text-lg font-bold">HP Management</h3>
<div
	class="grid grid-flow-col grid-cols-3 grid-rows-2 place-items-center content-center items-center"
>
	<span class="uppercase">Current HP</span>
	<span class="text-4xl font-extrabold">{$c.hp.current}</span>
	<span class="uppercase">Max HP</span>
	<span class="text-4xl font-extrabold">{$c.hp.max}</span>
	<span class="uppercase">Temp HP</span>
	<input
		type="number"
		class:input-error={$tempHpInvalid}
		class="input input-bordered w-16 text-center text-2xl"
		bind:value={$tempHp}
	/>
</div>
<div class="divider">Modify</div>
<div class="flex flex-row items-stretch gap-4">
	<button on:click|preventDefault={damage} class="btn flex-grow bg-red-500 text-2xl">-</button>
	<input
		type="number"
		class="input input-bordered w-16 text-center text-2xl"
		class:input-error={$amountInvalid}
		min="0"
		bind:value={$amount}
	/>
	<button on:click|preventDefault={heal} class="btn flex-grow bg-green-500 text-2xl">+</button>
</div>
