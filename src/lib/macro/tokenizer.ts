export const enum TokenType {
	INVALID = 'INVALID',
	INTEGER = 'INTEGER',
	DECIMAL = 'DECIMAL',
	IDENTIFIER = 'IDENTIFIER',
	OPERATOR = 'OPERATOR',
	PARENTHESIS_LEFT = 'PARENTHESIS_LEFT',
	PARENTHESIS_RIGHT = 'PARENTHESIS_RIGHT',
	COMMA = 'COMMA',
	AT = 'AT',
	PERIOD = 'PERIOD',
}

const TokenSpec: [RegExp, TokenType | null][] = [
	// Whitespace
	[/^\s+/, null],

	[/^,/, TokenType.COMMA],
	[/^@/, TokenType.AT],
	[/^\./, TokenType.PERIOD], // Check for period before decimal

	[/^\d+\.\d+/, TokenType.DECIMAL], // Check for decimal before integer
	[/^\d+/, TokenType.INTEGER], // Check for integer before identifier
	[/^\w[\w\d]*/, TokenType.IDENTIFIER],

	[/^(\+|-|\*{1,2}|\/{1,2}|%)/, TokenType.OPERATOR],

	[/^\(/, TokenType.PARENTHESIS_LEFT],
	[/^\)/, TokenType.PARENTHESIS_RIGHT],
];

export type Token = {
	type: TokenType;
	from: number;
	to: number;
	value: string;
};

export class Tokenizer {
	public constructor(public input: string) {}

	*[Symbol.iterator](): Generator<Token, undefined> {
		let cursor = 0;

		const matchAndAdvance = (regex: RegExp, inputSlice: string) => {
			const matched = regex.exec(inputSlice);
			if (matched === null) {
				return undefined;
			}

			cursor += matched[0].length;
			return matched[0];
		};

		tokenLoop: while (cursor < this.input.length) {
			const inputSlice = this.input.slice(cursor);

			for (const [regex, type] of TokenSpec) {
				const tokenValue = matchAndAdvance(regex, inputSlice);

				// Rule didn't match, try next rule
				if (!tokenValue) continue;

				// Matched token is ignored, continue on
				if (!type) continue tokenLoop;

				yield {
					type,
					from: cursor - tokenValue.length,
					to: cursor,
					value: tokenValue,
				};
				continue tokenLoop;
			}

			// No rule matched, yield invalid token and stop iterator
			yield {
				type: TokenType.INVALID,
				from: cursor,
				to: cursor + 1,
				value: inputSlice[0],
			};
			cursor += 1;
		}

		// Reached end of input
		return;
	}

	public allTokens(): Token[] {
		return this[Symbol.iterator]().toArray();
	}
}
