import { type VariantProps } from 'cva';
import type { HTMLAttributes } from 'svelte/elements';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CVAProps<T extends EventTarget, CVA extends (...args: any) => any> = Partial<
	Omit<HTMLAttributes<T>, keyof VariantProps<CVA>>
> &
	VariantProps<CVA>;
