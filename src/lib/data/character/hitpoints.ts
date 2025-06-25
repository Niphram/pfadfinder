import { autoserialize } from 'cerialize';

import { mapSum } from '$lib/utils';

import { Derive, Macro, macro } from '../macros';

export class HitPoints {
	@autoserialize
	rolled = 0;

	@macro
	bonus = new Macro('0');

	// Average HP based on hit dice
	readonly average = new Derive((c) => {
		const [firstClass, ...remainingClasses] = c.classes.list;

		const firstLevelHp = Math.ceil((firstClass.hitDice + 1) / 2);
		const remainingLevelsHp = mapSum(
			remainingClasses,
			(cls) => Math.ceil((cls.hitDice + 1) / 2) * cls.level,
		);

		return firstLevelHp + remainingLevelsHp;
	});

	@autoserialize
	temp = 0;

	@autoserialize
	damageTaken = 0;

	@autoserialize
	nonlethalDamage = 0;

	readonly current = new Derive((c) => c.hp.max.eval(c) - this.damageTaken);

	readonly conHp = new Derive((c) => c.classes.levels * c.con.mod.eval(c));

	readonly max = new Derive(
		(c) =>
			(c.settings.useAverageHP ? this.average.eval(c) : this.rolled) +
			this.conHp.eval(c) +
			this.bonus.eval(c),
	);

	heal(amount: number) {
		this.damageTaken = Math.max(0, this.damageTaken - amount);
		this.nonlethalDamage = Math.max(0, this.nonlethalDamage - amount);
	}

	dealLethal(amount: number) {
		const remaining = Math.max(0, amount - this.temp);
		this.temp = Math.max(0, this.temp - amount);
		this.damageTaken += remaining;
	}

	dealNonlethal(amount: number) {
		this.nonlethalDamage += amount;
	}
}
