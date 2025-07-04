import { autoserialize } from 'cerialize';

export class Settings {
	@autoserialize
	heal = true;

	@autoserialize
	addConToHeal = false;

	@autoserialize
	healAbilityDamage = true;

	@autoserialize
	rechargeSLA = true;

	@autoserialize
	rechargeTraits = true;

	@autoserialize
	rechargeItems = true;

	@autoserialize
	resetSpellUsage = true;

	@autoserialize
	resetPreparedSpells = true;

	@autoserialize
	showMagicPage = true;

	@autoserialize
	usePersonaSystem = false;

	@autoserialize
	useAverageHP = false;

	@autoserialize
	enableMacroHighlighting = true;

	@autoserialize
	experimentalFeatures = false;
}
