import { autoserialize } from 'cerialize';

export class HitPoints {
	@autoserialize
	max = 0;

	@autoserialize
	current = 0;

	@autoserialize
	temp = 0;

	heal(amount: number) {
		this.current += amount;
		this.current = Math.min(this.current, this.max);
	}
}
