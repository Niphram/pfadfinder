export const enum AstNodeType {
	Error,
	Constant,
	Attribute,
	Unary,
	Binary,
	Func,
}

export type AstNode = ErrorNode | ConstantNode | AttributeNode | UnaryNode | BinaryNode | FuncNode;

export type ErrorNode = {
	type: AstNodeType.Error;
	message: string;
};

export type ConstantNode = {
	type: AstNodeType.Constant;
	constant: number;
};

export type AttributeNode = {
	type: AstNodeType.Attribute;
	path: string[];
};

export type UnaryNode = {
	type: AstNodeType.Unary;
	op: '+' | '-';
	node: AstNode;
};

export type BinaryNode = {
	type: AstNodeType.Binary;
	op: '+' | '-' | '*' | '/' | '%';
	left: AstNode;
	right: AstNode;
};

export type FuncNode = {
	type: AstNodeType.Func;
	func: 'floor' | 'round' | 'ceil' | 'min' | 'max' | 'clamp' | 'abs' | 'step';
	nodes: AstNode[];
};
