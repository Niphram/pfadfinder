export abstract class BaseSystem<C> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	abstract upgradeCharacterAndDeserialize(char: any): C;

	// abstract get SheetComponent(): SvelteComponent<{ c: SerdeProxy<C> }>;
}
