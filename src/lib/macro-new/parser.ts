import {
	AstNodeType,
	type FuncNode,
	type AstNode,
	type UnaryNode,
	type BinaryNode,
	type ConstantNode,
	type AttributeNode,
} from './ast';
import { Tokenizer, TokenType } from './tokenizer';

// Precedence-Values, higher values have more precedence
const enum Precedence {
	DEFAULT = 0,
	ADDITIVE,
	MULTIPLICATIVE,
	UNARY,
}

export class Parser {
	private tokenizer: Tokenizer;
	private lookahead: { type: TokenType; value: string } | null;

	private constructor(input: string) {
		this.tokenizer = new Tokenizer(input);
		this.lookahead = this.tokenizer.getNextToken();
	}

	public static parse(input: string) {
		const parser = new Parser(input);

		if (!parser.lookahead) {
			return null;
		}

		return parser.Expression();
	}

	private getOperatorPrecedence(type: string) {
		switch (type) {
			case '*':
			case '/':
				return Precedence.MULTIPLICATIVE;

			case '+':
			case '-':
				return Precedence.ADDITIVE;
		}

		return Precedence.DEFAULT;
	}

	// Expect a particular token, consume it, and move to the next token
	private consume(tokenType: TokenType) {
		const token = this.lookahead;

		if (!token) {
			throw new SyntaxError(`Unexpected end of input, expected "${tokenType}"`);
		}

		if (token.type !== tokenType) {
			throw new SyntaxError(`Unexpected token: "${token.value}", expected "${tokenType}"`);
		}

		// Advance to the next token
		this.lookahead = this.tokenizer.getNextToken();

		return token;
	}

	// Try to consume the expected token, but don't fail otherwise
	private consumeOpt(tokenType: TokenType) {
		if (this.lookahead?.type !== tokenType) return null;

		return this.consume(tokenType);
	}

	// Try each expected token and consume the first matching one
	private consumeOneOf(...tokenTypes: TokenType[]) {
		if (!this.lookahead) {
			throw new SyntaxError(`Unexpected end of input, expected one of "${tokenTypes.join(', ')}"`);
		}

		for (const tokenType of tokenTypes) {
			const token = this.consumeOpt(tokenType);
			if (token) return token;
		}

		throw new SyntaxError(
			`Unexpected token: "${this.lookahead.value}", expected "${tokenTypes.join(', ')}"`,
		);
	}

	/**
	 * Expression
	 *    = Prefix (Infix)*
	 */
	private Expression(prec: Precedence = Precedence.DEFAULT): AstNode {
		let left = this.Prefix();

		while (this.lookahead && prec < this.getOperatorPrecedence(this.lookahead.value)) {
			left = this.Infix(left, this.lookahead.type);
		}

		return left;
	}

	/**
	 * CommaSeperatedExpressions
	 *    = Expression ("," Expression)*
	 */
	private CommaSeperatedExpressions(): AstNode[] {
		const expressions = [];

		do {
			expressions.push(this.Expression());
		} while (this.consumeOpt(TokenType.COMMA));

		return expressions;
	}

	/**
	 * Prefix
	 *    = ParenthesizedExpression
	 *    / UnaryExpression
	 * 	  / Attribute
	 *    / FunctionExpression
	 *    / NUMBER
	 */
	private Prefix(): AstNode {
		switch (this.lookahead?.type) {
			case TokenType.PARENTHESIS_LEFT:
				return this.ParenthesizedExpression();
			case TokenType.IDENTIFIER:
				return this.Function();
			case TokenType.OPERATOR:
				return this.UnaryExpression();
			case TokenType.INTEGER:
			case TokenType.DECIMAL:
				return this.Constant();
			case TokenType.AT:
				return this.Attribute();
		}

		throw new SyntaxError(`Unexpected Token: "${this.lookahead?.value}"`);
	}

	/**
	 * Infix
	 *    = ("+" / "-" / "*" / "/" / "%") Expression
	 */
	private Infix(left: AstNode, operatorType: TokenType): BinaryNode {
		const op = this.consume(operatorType).value;
		const newPrec = this.getOperatorPrecedence(op);

		switch (op) {
			case '+':
			case '-':
			case '*':
			case '/':
			case '%':
				return {
					type: AstNodeType.Binary,
					op,
					left,
					right: this.Expression(newPrec),
				};

			default:
				throw new SyntaxError(`Unexpected Operator: "${op}"`);
		}
	}

	/**
	 * ParenthesizedExpression
	 *    = "(" Expression ")"
	 */
	private ParenthesizedExpression(): AstNode {
		this.consume(TokenType.PARENTHESIS_LEFT);
		const node = this.Expression();
		this.consume(TokenType.PARENTHESIS_RIGHT);

		return node;
	}

	/**
	 * UnaryExpression
	 *    = "-" | "+" Expression
	 */
	private UnaryExpression(): UnaryNode {
		const op = this.consume(TokenType.OPERATOR).value;

		switch (op) {
			case '+':
			case '-':
				return {
					type: AstNodeType.Unary,
					op,
					node: this.Expression(Precedence.UNARY),
				};

			default:
				throw new SyntaxError(`Unexpected Token: "${op}", expected "+" or "-".`);
		}
	}

	/**
	 * Constant
	 *    = INTEGER
	 *    / DECIMAL
	 */
	private Constant(): ConstantNode {
		const token = this.consumeOneOf(TokenType.INTEGER, TokenType.DECIMAL);

		return {
			type: AstNodeType.Constant,
			constant: Number(token.value),
		};
	}

	/**
	 * FunctionExpression
	 *    = "@" (Identifier / INTEGER ) ("." (Identifier / INTEGER))*
	 */
	private Attribute(): AttributeNode {
		this.consume(TokenType.AT);

		const path: string[] = [];

		do {
			path.push(this.consumeOneOf(TokenType.IDENTIFIER, TokenType.INTEGER).value);
		} while (this.consumeOpt(TokenType.PERIOD));

		return {
			type: AstNodeType.Attribute,
			path,
		};
	}

	/**
	 * FunctionExpression
	 *    = "floor" "(" Expression ")"
	 * 	  / "round" "(" Expression ")"
	 * 	  / "ceil" "(" Expression ")"
	 * 	  / "abs" "(" Expression ")"
	 * 	  / "min" "(" Expression ("," Expression)* ")"
	 * 	  / "max" "(" Expression ("," Expression)* ")"
	 * 	  / "clamp" "(" Expression "," Expression "," Expression ")"
	 * 	  / "step" "(" Expression "," Expression ")"
	 */
	private Function(): FuncNode {
		const func = this.consume(TokenType.IDENTIFIER).value;
		this.consume(TokenType.PARENTHESIS_LEFT);
		const nodes = this.CommaSeperatedExpressions();
		this.consume(TokenType.PARENTHESIS_RIGHT);

		switch (func) {
			// Functions that take one argument
			case 'floor':
			case 'round':
			case 'ceil':
			case 'abs':
				if (nodes.length !== 1)
					throw new SyntaxError(`Function "${func}" expected 1 argument, got ${nodes.length}`);
				break;

			// Min and Max take any amount of parameters
			case 'min':
			case 'max':
				break;

			// clamp(val, min, max)
			case 'clamp':
				if (nodes.length !== 3)
					throw new SyntaxError(`Function "${func}" expected 3 argument, got ${nodes.length}`);
				break;

			// step(val, threshold)
			case 'step':
				if (nodes.length !== 2)
					throw new SyntaxError(`Function "${func}" expected 2 argument, got ${nodes.length}`);
				break;

			default:
				throw new SyntaxError(`Invalid function: ""${func}""`);
		}

		return {
			type: AstNodeType.Func,
			func,
			nodes,
		};
	}
}
