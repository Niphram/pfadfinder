<script lang="ts">
	import { c } from '$lib/state';
	import { withSign } from '$lib/utils/format';

	import CaptionedButton from '$lib/components/captioned-button.svelte';
</script>

<div class="flex flex-col gap-4">
	<div class="divider">Mods</div>

	<div class="grid w-full grid-cols-2 gap-2 md:grid-cols-4">
		<CaptionedButton label={withSign($c.combat.bab)} caption="Base Attack Bonus" />
		<CaptionedButton label={withSign($c.combat.sr)} caption="Spell Resistance" />
		<CaptionedButton label={withSign($c.combat.cmb)} caption="CMB" />
		<CaptionedButton label={withSign($c.combat.cmd)} caption="CMD" />
	</div>
</div>
