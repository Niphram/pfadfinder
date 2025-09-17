export const enum AstNodeType {
	Error,
	Constant,
	Attribute,
	Unary,
	Binary,
	Func,
}

type NodeCommon = {
	from: number;
	to: number;
};

export type AstNode =
	| ConstantNode
	| AttributeNode
	| UnaryNode
	| BinaryNode
	| FuncNode;

export type ConstantNode = {
	type: AstNodeType.Constant;
	constant: number;
} & NodeCommon;

export type AttributeNode = {
	type: AstNodeType.Attribute;
	path: string[];
} & NodeCommon;

export type UnaryNode = {
	type: AstNodeType.Unary;
	op: '+' | '-';
	node: AstNode;
} & NodeCommon;

export type BinaryNode = {
	type: AstNodeType.Binary;
	op: '+' | '-' | '*' | '/' | '%';
	left: AstNode;
	right: AstNode;
} & NodeCommon;

export type FuncNode = {
	type: AstNodeType.Func;
	func: 'floor' | 'round' | 'ceil' | 'min' | 'max' | 'clamp' | 'abs' | 'step';
	nodes: AstNode[];
} & NodeCommon;
