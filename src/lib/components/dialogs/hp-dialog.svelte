<script lang="ts">
	import Alert from '$lib/atoms/alert.svelte';
	import Divider from '$lib/atoms/divider.svelte';
	import { getChar } from '$lib/data/context';
	import { preventDefault } from '$lib/utils';

	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';
	import MacroInteger from '../input/macro-integer.svelte';

	let { c } = getChar();

	$: conHp = $c.hp.conHp.eval($c);
	$: currentAndTempHp = $c.hp.current.eval($c) + $c.hp.temp;

	let modifyAmount = 1;

	$title = 'Hitpoints';
</script>

<div class="flex h-full flex-col gap-4">
	<div class="flex grow flex-col gap-4">
		<div
			class="grid grid-flow-row grid-cols-2 place-items-center content-center items-center gap-2"
		>
			<div class="flex flex-col items-center">
				<span class="uppercase">Current HP</span>

				<!--
					TODO: Make this error-proof

					<input
						type="number"
						disabled
						class="input input-bordered w-full text-center text-2xl"
						value={$c.hp.current.eval($c)}
						oninput={(e) => ($c.hp.damage_taken = $c.hp.max.eval($c) - +e.currentTarget.value)}
					/>
				-->

				<span class="text-4xl font-extrabold">{$c.hp.current.eval($c)}</span>
			</div>

			<div class="flex flex-col items-center">
				<span class="uppercase">Max HP</span>
				<span class="text-4xl font-extrabold">{$c.hp.max.eval($c)}</span>
			</div>
			<div class="flex flex-col items-center">
				<span class="uppercase">Temp HP</span>
				<input
					type="number"
					class="input input-bordered w-full text-center text-2xl"
					min="0"
					bind:value={$c.hp.temp}
				/>
			</div>
			<div class="flex flex-col items-center">
				<span class="uppercase">Non Lethal</span>
				<input
					type="number"
					class="input input-bordered w-full text-center text-2xl"
					bind:value={$c.hp.nonlethalDamage}
				/>
			</div>
		</div>

		<Divider>Modify</Divider>

		<div class="flex h-min flex-row items-stretch gap-4">
			<div class="flex flex-1 basis-0 flex-col">
				<button
					onclick={preventDefault(() => ($c.hp.heal(modifyAmount), ($c = $c)))}
					class="btn grow bg-green-500 px-2 text-lg lg:text-xl">Heal</button
				>
			</div>
			<input
				type="number"
				class="input input-bordered h-auto w-24 text-center text-6xl"
				min="0"
				bind:value={modifyAmount}
			/>
			<div class="flex flex-1 basis-0 flex-col gap-2">
				<button
					onclick={preventDefault(() => ($c.hp.dealLethal(modifyAmount), ($c = $c)))}
					class="btn grow bg-red-500 px-2 text-lg lg:text-xl">Lethal</button
				>
				<button
					onclick={preventDefault(() => ($c.hp.dealNonLethal(modifyAmount), ($c = $c)))}
					class="btn grow bg-orange-500 px-2 text-lg lg:text-xl">Non-Lethal</button
				>
			</div>
		</div>

		{#if currentAndTempHp <= -$c.con.total.eval($c)}
			<Alert level="warning">
				Character has hitpoints equal to or lower than their constitution-score
			</Alert>
		{:else if currentAndTempHp < 0}
			<Alert level="warning">Character has negative hitpoints</Alert>
		{:else if currentAndTempHp === 0}
			<Alert level="warning">Character's hitpoints are equal to zero</Alert>
		{:else if $c.hp.nonlethalDamage > currentAndTempHp}
			<Alert level="warning">Nonlethal damage exceeds character's hitpoints</Alert>
		{/if}
	</div>

	<div class="contents">
		<Divider>Values</Divider>

		{#if conHp !== 0}
			<Alert level="info">
				Constitution Mod: {Math.abs(conHp)} HP will be {conHp < 0 ? 'subtracted' : 'added'}
			</Alert>
		{/if}

		<Integer
			label="Rolled Hitpoints (excluding CON)"
			name="rolled_hp"
			bind:value={$c.hp.rolled}
			noNegatives
		/>

		<MacroInteger label="Bonus HP" bind:value={$c.hp.bonus.expr} name="bonus_hp" />
	</div>
</div>
