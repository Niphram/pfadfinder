// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UPGRADES: ((char: any) => void)[] = [
	// Version 2, rename spell levels
	(char: { spells: Record<`level_${number}` | number, unknown> }) => {
		for (let i = 0; i <= 9; i++) {
			char.spells[`level_${i}`] = char.spells[i];
		}
	}
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function upgradeCharacter(char: any) {
	for (let v = char.version; v <= UPGRADES.length; v++) {
		UPGRADES[v - 1](char);
		char.version = v + 1;
	}

	return char;
}
