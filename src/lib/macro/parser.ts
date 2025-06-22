import {
	AstNodeType,
	type AstNode,
	type AttributeNode,
	type BinaryNode,
	type ConstantNode,
	type ErrorNode,
	type FuncNode,
	type UnaryNode,
} from './ast';
import { Tokenizer, TokenType, type Token } from './tokenizer';

// Precedence-Values, higher values have more precedence
const enum Precedence {
	DEFAULT = 0,
	ADDITIVE,
	MULTIPLICATIVE,
	UNARY,
}

function ParserError(message: string): ErrorNode {
	return {
		type: AstNodeType.Error,
		message,
	};
}

export class Parser {
	private tokenizer: Tokenizer;
	private lookahead: Token | undefined;

	private constructor(input: string) {
		this.tokenizer = new Tokenizer(input);
	}

	public static parse(input: string) {
		const parser = new Parser(input);

		const iter = parser.init();
		let current = iter.next();
		while (!current.done) {
			// Error occured
			if (current.value) return current.value;
			current = iter.next();
		}

		return current.value;
	}

	private *init(): Generator<ErrorNode, AstNode> {
		const nextTokenResult = this.tokenizer.getNextToken();
		if (nextTokenResult.ok) {
			this.lookahead = nextTokenResult.token;
		} else {
			return yield ParserError(nextTokenResult.message);
		}

		return yield* this.Expression();
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
	private *consume(tokenType: TokenType): Generator<ErrorNode, Token> {
		const token = this.lookahead;

		if (!token) {
			return yield ParserError(`Unexpected end of input, expected "${tokenType}"`);
		}

		if (token.type !== tokenType) {
			return yield ParserError(`Unexpected token: "${token.value}", expected "${tokenType}"`);
		}

		// Advance to the next token
		const nextTokenResult = this.tokenizer.getNextToken();
		if (nextTokenResult.ok) {
			this.lookahead = nextTokenResult.token;
		} else {
			return yield ParserError(nextTokenResult.message);
		}

		return token;
	}

	// Try to consume the expected token, but don't fail otherwise
	private *consumeOpt(tokenType: TokenType): Generator<ErrorNode, Token | undefined> {
		if (this.lookahead?.type !== tokenType) return undefined;

		return yield* this.consume(tokenType);
	}

	// Try each expected token and consume the first matching one
	private *consumeOneOf(...tokenTypes: TokenType[]): Generator<ErrorNode, Token> {
		if (!this.lookahead) {
			return yield ParserError(
				`Unexpected end of input, expected one of "${tokenTypes.join(', ')}"`,
			);
		}

		for (const tokenType of tokenTypes) {
			const token = yield* this.consumeOpt(tokenType);
			if (token) return token;
		}

		return yield ParserError(
			`Unexpected token: "${this.lookahead.value}", expected "${tokenTypes.join(', ')}"`,
		);
	}

	/**
	 * Expression
	 *    = Prefix (Infix)*
	 */
	private *Expression(prec: Precedence = Precedence.DEFAULT): Generator<ErrorNode, AstNode> {
		let left = yield* this.Prefix();

		while (this.lookahead && prec < this.getOperatorPrecedence(this.lookahead.value)) {
			left = yield* this.Infix(left, this.lookahead.type);
		}

		return left;
	}

	/**
	 * CommaSeperatedExpressions
	 *    = Expression ("," Expression)*
	 */
	private *CommaSeperatedExpressions(): Generator<ErrorNode, AstNode[]> {
		const expressions = [];

		do {
			expressions.push(yield* this.Expression());
		} while (yield* this.consumeOpt(TokenType.COMMA));

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
	private *Prefix(): Generator<ErrorNode, AstNode> {
		if (!this.lookahead) {
			return yield ParserError(`Unexpected end of input, expected a valid expression`);
		}

		switch (this.lookahead?.type) {
			case TokenType.PARENTHESIS_LEFT:
				return yield* this.ParenthesizedExpression();
			case TokenType.IDENTIFIER:
				return yield* this.Function();
			case TokenType.OPERATOR:
				return yield* this.UnaryExpression();
			case TokenType.INTEGER:
			case TokenType.DECIMAL:
				return yield* this.Constant();
			case TokenType.AT:
				return yield* this.Attribute();
		}

		return yield ParserError(`Unexpected Token: "${this.lookahead?.value}"`);
	}

	/**
	 * Infix
	 *    = ("+" / "-" / "*" / "/" / "%") Expression
	 */
	private *Infix(left: AstNode, operatorType: TokenType): Generator<ErrorNode, BinaryNode> {
		const op = (yield* this.consume(operatorType)).value;
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
					right: yield* this.Expression(newPrec),
				};

			default:
				return yield ParserError(`Unexpected Operator: "${op}". Valid operators are + - * / %`);
		}
	}

	/**
	 * ParenthesizedExpression
	 *    = "(" Expression ")"
	 */
	private *ParenthesizedExpression(): Generator<ErrorNode, AstNode> {
		yield* this.consume(TokenType.PARENTHESIS_LEFT);
		const node = yield* this.Expression();
		yield* this.consume(TokenType.PARENTHESIS_RIGHT);

		return node;
	}

	/**
	 * UnaryExpression
	 *    = "-" | "+" Expression
	 */
	private *UnaryExpression(): Generator<ErrorNode, UnaryNode> {
		const op = (yield* this.consume(TokenType.OPERATOR)).value;

		switch (op) {
			case '+':
			case '-':
				return {
					type: AstNodeType.Unary,
					op,
					node: yield* this.Expression(Precedence.UNARY),
				};

			default:
				return yield ParserError(`Unexpected Token: "${op}", expected "+" or "-".`);
		}
	}

	/**
	 * Constant
	 *    = INTEGER
	 *    / DECIMAL
	 */
	private *Constant(): Generator<ErrorNode, ConstantNode> {
		const token = yield* this.consumeOneOf(TokenType.INTEGER, TokenType.DECIMAL);

		return {
			type: AstNodeType.Constant,
			constant: Number(token.value),
		};
	}

	/**
	 * FunctionExpression
	 *    = "@" (Identifier / INTEGER ) ("." (Identifier / INTEGER))*
	 */
	private *Attribute(): Generator<ErrorNode, AttributeNode> {
		yield* this.consume(TokenType.AT);

		const path: string[] = [];

		do {
			const token = yield* this.consumeOneOf(TokenType.IDENTIFIER, TokenType.INTEGER);
			path.push(token.value);
		} while (yield* this.consumeOpt(TokenType.PERIOD));

		return {
			type: AstNodeType.Attribute,
			path,
		};
	}

	private *FunctionName(): Generator<ErrorNode, FuncNode['func']> {
		const func = (yield* this.consume(TokenType.IDENTIFIER)).value;

		switch (func) {
			case 'floor':
			case 'round':
			case 'ceil':
			case 'abs':
			case 'min':
			case 'max':
			case 'clamp':
			case 'step':
				return func;
		}

		return yield ParserError(`Invalid function: "${func}"`);
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
	private *Function(): Generator<ErrorNode, FuncNode> {
		const func = yield* this.FunctionName();
		yield* this.consume(TokenType.PARENTHESIS_LEFT);
		const nodes = yield* this.CommaSeperatedExpressions();
		yield* this.consume(TokenType.PARENTHESIS_RIGHT);

		switch (func) {
			// Functions that take one argument
			case 'floor':
			case 'round':
			case 'ceil':
			case 'abs':
				if (nodes.length !== 1)
					return yield ParserError(`Function "${func}" expected 1 argument, got ${nodes.length}`);
				break;

			// Min and Max take any amount of parameters
			case 'min':
			case 'max':
				break;

			// clamp(val, min, max)
			case 'clamp':
				if (nodes.length !== 3)
					return yield ParserError(`Function "${func}" expected 3 argument, got ${nodes.length}`);
				break;

			// step(val, threshold)
			case 'step':
				if (nodes.length !== 2)
					return yield ParserError(`Function "${func}" expected 2 argument, got ${nodes.length}`);
				break;
		}

		return {
			type: AstNodeType.Func,
			func,
			nodes,
		};
	}
}
