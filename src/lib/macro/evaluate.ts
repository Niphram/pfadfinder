import { iteratorResultToResult } from '$lib/utils';

import { AstNodeType, type AstNode, type AttributeNode } from './ast';
import type { RuntimeError } from './errors';

function runtimeError(message: string, from: number, to: number): RuntimeError {
	return {
		message,
		from,
		to,
	};
}

function* evalAttribute(node: AttributeNode, char: object): Generator<RuntimeError, number> {
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let val: any = char;
		for (const p of node.path) {
			if (!(p in val)) return yield runtimeError(`Attribute is unknown`, node.from, node.to);

			val = val[p];
		}

		if (typeof val === 'number') {
			return val;
		}

		return yield runtimeError('Attribute is not a number', node.from, node.to);
	} catch (_err) {
		return yield runtimeError('Unknown Error', node.from, node.to);
	}
}

function evalUnary(op: '+' | '-', value: number): number {
	return op === '+' ? value : -value;
}

function evalBinary(op: '+' | '-' | '*' | '/' | '%', left: number, right: number): number {
	switch (op) {
		case '+':
			return left + right;
		case '-':
			return left - right;
		case '*':
			return left * right;
		case '/':
			return left / right;
		case '%':
			return left % right;
	}
}

function evalFunc(
	func: 'floor' | 'round' | 'ceil' | 'min' | 'max' | 'clamp' | 'abs' | 'step',
	values: number[],
): number {
	switch (func) {
		case 'floor':
			return Math.floor(values[0]);
		case 'round':
			return Math.round(values[0]);
		case 'ceil':
			return Math.ceil(values[0]);
		case 'min':
			return Math.min(...values);
		case 'max':
			return Math.max(...values);
		case 'clamp':
			return Math.min(Math.max(values[0], values[1]), values[2]);
		case 'abs':
			return Math.abs(values[0]);
		case 'step':
			return values[0] < values[1] ? 0 : 1;
	}
}

export function* evalNodeGen(node: AstNode, char: object): Generator<RuntimeError, number> {
	switch (node.type) {
		case AstNodeType.Constant:
			return node.constant;
		case AstNodeType.Attribute:
			return yield* evalAttribute(node, char);
		case AstNodeType.Unary:
			return evalUnary(node.op, yield* evalNodeGen(node.node, char));
		case AstNodeType.Binary:
			return evalBinary(
				node.op,
				yield* evalNodeGen(node.left, char),
				yield* evalNodeGen(node.right, char),
			);
		case AstNodeType.Func: {
			const nodes: number[] = [];

			for (const n of node.nodes) {
				nodes.push(yield* evalNodeGen(n, char));
			}

			return evalFunc(node.func, nodes);
		}
	}
}

export function evalNode(node: AstNode, char: object) {
	return iteratorResultToResult(evalNodeGen(node, char).next()).value ?? NaN;
}
