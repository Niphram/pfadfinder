export const UNARY_OPERATORS = ['+', '-'] as const;
export type UnaryOperator = (typeof UNARY_OPERATORS)[number];

export const BINARY_OPERATORS = ['+', '-', '*', '/', '%', '//', '**'] as const;
export type BinaryOperator = (typeof BINARY_OPERATORS)[number];

export const FUNCTION_NAMES = [
	'floor',
	'round',
	'ceil',
	'min',
	'max',
	'clamp',
	'abs',
	'step',
] as const;
export type FunctionName = (typeof FUNCTION_NAMES)[number];
