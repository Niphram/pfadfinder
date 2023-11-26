<script lang="ts">
	import { c } from '$lib/data';
	import { title } from '../dialog.svelte';

	$title = 'Rest';

	let heal = true;
	let addConToHeal = false;
	let rechargeTraits = true;

	function rest8Hours() {
		// Heal
		if (heal) $c.hp.heal($c.classes.levels);
		if (addConToHeal) $c.hp.heal(Math.max(0, $c.con.mod.eval($c)));

		// Recharge all features/traits
		if (rechargeTraits) $c.traits.forEach((t) => t.recharge($c));

		$c = $c;
	}
</script>

<div class="flex flex-col">
	<div class="divider">Options</div>

	<div class="form-control">
		<label class="label cursor-pointer pb-0">
			<span class="label-text">Heal for 1 HP per level ({$c.classes.levels} HP)</span>
			<input type="checkbox" class="toggle" bind:checked={heal} />
		</label>
	</div>

	<div class="form-control">
		<label class="label cursor-pointer pb-0">
			<span class="label-text">Add CON when healing ({Math.max(0, $c.con.mod.eval($c))} HP)</span>
			<input type="checkbox" class="toggle" bind:checked={addConToHeal} />
		</label>
	</div>

	<div class="form-control">
		<label class="label cursor-pointer pb-0">
			<span class="label-text">Recharge traits</span>
			<input type="checkbox" class="toggle" bind:checked={rechargeTraits} />
		</label>
	</div>

	<div class="divider" />

	<button class="btn" on:click={() => rest8Hours()}>8 hours</button>
</div>
