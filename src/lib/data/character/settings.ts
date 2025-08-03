import { boolean } from '$lib/serde';

export class Settings {
	heal = boolean(true);

	addConToHeal = boolean(false);

	healAbilityDamage = boolean(true);

	rechargeSLA = boolean(true);

	rechargeTraits = boolean(true);

	rechargeItems = boolean(true);

	resetSpellUsage = boolean(true);

	resetPreparedSpells = boolean(true);

	showMagicPage = boolean(true);

	usePersonaSystem = boolean(false);

	useAverageHP = boolean(false);

	enableMacroHighlighting = boolean(true);

	experimentalFeatures = boolean(false);
}
