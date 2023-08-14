const FORMULA_SYMBOL = Symbol('formula');

export type Formula = string & { [FORMULA_SYMBOL]: unknown };
export type FormulaFactory = () => Formula;

export function formula(expr: string): Formula;
export function formula(expr: () => string): FormulaFactory;
export function formula(expr: string | (() => string)): Formula | FormulaFactory {
	return expr as Formula | FormulaFactory;
}
