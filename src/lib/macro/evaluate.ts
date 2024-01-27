import type { Character } from '$lib/data';
import { Derive } from '$lib/data/macros';
import { Macro } from '$lib/data/macros/macro';
import { NodeType, parse, type Node } from './parser';

function calcAttribute(path: string[], char: Character): number {
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const val: unknown = path.reduce((c, p) => c[p], char as Record<string, any>);

		if (val instanceof Macro || val instanceof Derive) {
			return val.eval(char);
		}

		switch (typeof val) {
			case 'number':
				return val;
			case 'string':
				return calculateNode(parse(val), char);
			default:
				return NaN;
		}
	} catch (err) {
		return NaN;
	}
}

function calcUnary(op: '+' | '-', value: number): number {
	return op === '+' ? value : -value;
}

function calcBinary(op: '+' | '-' | '*' | '/' | '%', left: number, right: number): number {
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

function calcFunc(
	func: undefined | 'floor' | 'round' | 'ceil' | 'min' | 'max' | 'clamp',
	values: number[]
): number {
	switch (func) {
		case undefined:
			return values[0];
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
	}
}

export function calculateNode(node: Node, char: Character): number {
	switch (node.type) {
		case NodeType.Error:
			return NaN;
		case NodeType.Constant:
			return node.constant;
		case NodeType.Attribute:
			return calcAttribute(node.path, char);
		case NodeType.Unary:
			return calcUnary(node.op, calculateNode(node.node, char));
		case NodeType.Binary:
			return calcBinary(node.op, calculateNode(node.left, char), calculateNode(node.right, char));
		case NodeType.Func:
			return calcFunc(
				node.func,
				node.nodes.map((n) => calculateNode(n, char))
			);
	}
}

export function printNode(node: Node, char: Character): string {
	switch (node.type) {
		case NodeType.Error:
			return '[ERR]';
		case NodeType.Constant:
			return node.constant.toString();
		case NodeType.Attribute:
			return `${node.path.join('.')} [${calcAttribute(node.path, char)}]`;
		case NodeType.Unary:
			return `${node.op}${printNode(node.node, char)}`;
		case NodeType.Binary:
			return `${printNode(node.left, char)} ${node.op} ${printNode(node.right, char)}`;
		case NodeType.Func:
			return `${node.func ?? ''}( ${node.nodes.map((n) => printNode(n, char)).join()} )`;
	}
}
