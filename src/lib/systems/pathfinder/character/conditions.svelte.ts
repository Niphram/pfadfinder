import { boolean, ClassSerializer } from '$lib/serde';

import type { Skill } from './skills.svelte';

export class Conditions extends ClassSerializer {
	// Condition toggles

	blinded = boolean(false);

	// Modifier reducers

	readonly acMod = $derived(this.blinded.value ? -2 : 0);

	readonly looseAcDexBonus = $derived(this.blinded.value);

	skillCheckModifier(skill: Skill) {
		let totalMod = 0;

		if (
			this.blinded.value &&
			(['dex', 'str'].includes(skill.ability.value) ||
				skill.key === 'perception')
		) {
			totalMod -= 4;
		}

		return totalMod;
	}
}
