import type { SystemData } from '../types/system';
import { KidsOnBikes } from './kids-on-bikes';
import { Pathfinder } from './pathfinder';

export const SYSTEM_MAP = {
	pathfinder: Pathfinder,
	'kids-on-bikes': KidsOnBikes
} satisfies Record<string, SystemData>;
