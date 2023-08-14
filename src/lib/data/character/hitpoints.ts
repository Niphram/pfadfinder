import { autoserialize } from 'cerialize';

export class HitPoints {
	@autoserialize
	max = 0;

	@autoserialize
	current = 0;

	@autoserialize
	temp = 0;
}
