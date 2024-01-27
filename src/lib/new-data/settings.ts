import { autoserialize } from 'cerialize';

export class Settings {
	@autoserialize
	coinWeight = true;

	@autoserialize
	encumberance = true;
}
