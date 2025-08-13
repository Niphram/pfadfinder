import { derive, macro, number } from '$lib/serde';
import { ClassSerializer } from '$lib/serde/class-serializer';
import type { CharProxy } from '$lib/serde/proxy';
import { mapSum } from '$lib/utils';

import { Character } from './character.svelte';

export class HitPoints extends ClassSerializer {
	rolled = number(0);

	bonus = macro('0');

	// Average HP based on hit dice
	readonly average = derive<Character>((c) => {
		const [firstClass, ...remainingClasses] = c.classes.list;

		const firstLevelHp = Math.ceil((firstClass.hitDice + 1) / 2);
		const remainingLevelsHp = mapSum(
			remainingClasses,
			(cls) => Math.ceil((cls.hitDice + 1) / 2) * cls.level,
		);

		return firstLevelHp + remainingLevelsHp;
	});

	temp = number(0);

	damageTaken = number(0);

	nonlethalDamage = number(0);

	readonly current = derive<Character>((c) => c.hp.max - this.damageTaken.value);

	readonly conHp = derive<Character>((c) => c.classes.levels * c.con.mod);

	readonly max = derive<Character>(
		(c) =>
			(c.settings.useAverageHP ? this.average.eval(c) : this.rolled.value) +
			this.conHp.eval(c) +
			this.bonus.eval(c),
	);

	heal(this: CharProxy<HitPoints>, amount: number) {
		this.damageTaken = Math.max(0, this.damageTaken - amount);
		this.nonlethalDamage = Math.max(0, this.nonlethalDamage - amount);
	}

	dealLethal(this: CharProxy<HitPoints>, amount: number) {
		const remaining = Math.max(0, amount - this.temp);
		this.temp = Math.max(0, this.temp - amount);
		this.damageTaken += remaining;
	}

	dealNonlethal(this: CharProxy<HitPoints>, amount: number) {
		this.nonlethalDamage += amount;
	}
}
