import { browser } from '$app/environment';
import type { Action } from 'svelte/action';

type ElementType = HTMLDivElement | HTMLSpanElement;

type Options = {
	maxSize: number;
	minSize: number;
	step: number;
};

function isOverflowing({ clientWidth, clientHeight, scrollWidth, scrollHeight }: ElementType) {
	return clientWidth < scrollWidth || clientHeight < scrollHeight;
}

function scaleText(node: ElementType, maxSize: number, minSize: number, step: number) {
	for (let s = maxSize; s >= minSize; s -= step) {
		node.style.fontSize = `${s}px`;

		if (!isOverflowing(node)) return true;
	}

	return false;
}

const texts = new WeakMap<ElementType, Options>();

let resizeObserver =
	browser ?
		new ResizeObserver((entries) => {
			console.log(entries);

			for (const { target } of entries) {
				const options = texts.get(target as ElementType);
				if (options)
					scaleText(target as ElementType, options.maxSize, options.minSize, options.step);
			}
		})
	:	undefined;

export const fitText: Action<ElementType, Partial<Options> | undefined> = (
	node,
	{ maxSize = 16, minSize = 1, step = 0.25 } = {}
) => {
	texts.set(node, { maxSize, minSize, step });
	resizeObserver?.observe(node);

	scaleText(node, maxSize, minSize, step);

	return {
		update({ maxSize = 16, minSize = 1 } = {}) {
			scaleText(node, maxSize, minSize, step);
		},
		destroy() {
			resizeObserver?.unobserve(node);
			texts.delete(node);
		}
	};
};
