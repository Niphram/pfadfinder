<script lang="ts">
	import { t } from '$lib/i18n';
	import { c, type AbilityKey } from '$lib/state';
	import { withSign } from '$lib/utils';

	export let key: AbilityKey;
</script>

<button on:click class="btn h-min p-0">
	<div class="flex w-full flex-col divide-y text-center">
		<div class="py-1 text-3xl font-extrabold">
			{withSign($c.abilities[key].mod)}
		</div>
		<div class="py-1 text-xs">{$c.abilities[key].total}</div>
		<div class="py-1 uppercase">{$t(`abilities.${key}.short`)}</div>
	</div>
</button>
