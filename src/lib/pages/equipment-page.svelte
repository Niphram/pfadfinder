<script>
	import Integer from '$lib/components/input/integer.svelte';
	import TextArea from '$lib/components/input/text-area.svelte';
	import { c } from '$lib/state';
</script>

<div class="flex flex-col gap-2">
	<div class="divider mb-0">Money</div>

	<div class="flex flex-row gap-2">
		<Integer bind:value={$c.money.pp} label="PP" name="pp" placeholder="Platinum" />
		<Integer bind:value={$c.money.gp} label="GP" name="gp" placeholder="Gold" />
		<Integer bind:value={$c.money.sp} label="SP" name="sp" placeholder="Silver" />
		<Integer bind:value={$c.money.cp} label="CP" name="cp" placeholder="Copper" />
	</div>

	<TextArea bind:value={$c.money.other} name="valuables" placeholder="Other Valuables" rows={1} />

	<div class="divider">Gear</div>
	<div class="divider">AC Items</div>
</div>
