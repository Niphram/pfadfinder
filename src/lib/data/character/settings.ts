import { autoserialize } from 'cerialize';

export class Settings {
	@autoserialize
	heal = true;

	@autoserialize
	addConToHeal = false;

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
	usePersonaSystem = false;
}
