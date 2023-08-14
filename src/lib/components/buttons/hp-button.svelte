<script lang="ts">
	import { c } from '$lib/data';
</script>

<div>
	<button class="btn btn-neutral flex h-full p-2" on:click>
		<div class="flex flex-col justify-center text-center">
			<div class="text-xs">Hit Points</div>
			<div class="text-lg">
				{$c.hp.current}/{$c.hp.max}
				{#if $c.hp.temp > 0}
					<span class="text-blue-500"> ({$c.hp.temp})</span>
				{/if}
			</div>
		</div>
	</button>
</div>
