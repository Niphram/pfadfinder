export type DeepPartial<T extends {}> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type PickProps<T extends object, P> = {
	[K in keyof T]: T[K] extends P ? T[K] : never;
};
