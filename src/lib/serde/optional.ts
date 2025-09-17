export type Option<V, Optional extends boolean> = Optional extends true ? V | null : V;
