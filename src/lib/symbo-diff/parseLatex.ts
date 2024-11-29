import Function from "./Function";
import Integer from "./operands/Integer";
import Constant from "./operands/Constant";
import Transcendental from "./operands/Transcendental";
import Variable from "./operands/Variable";
import Addition from "./operators/basic/Addition";
import Division from "./operators/basic/Division";
import Multiplication from "./operators/basic/Multiplication";
import Negation from "./operators/basic/Negation";
import Root from "./operators/basic/Root";
import Subtraction from "./operators/basic/Subtraction";
import Exponentiation from "./operators/exponential/Exponentiation";
import Logarithm from "./operators/exponential/Logarithm";
import Arccosine from "./operators/trigonometric/Arccosine";
import Arcsine from "./operators/trigonometric/Arcsine";
import Arctangent from "./operators/trigonometric/Arctangent";
import Cosecant from "./operators/trigonometric/Cosecant";
import Cosine from "./operators/trigonometric/Cosine";
import Cotangent from "./operators/trigonometric/Cotangent";
import Secant from "./operators/trigonometric/Secant";
import Sine from "./operators/trigonometric/Sine";
import Tangent from "./operators/trigonometric/Tangent";

/**
 * Parses the given LaTeX into a Function. If the LaTeX is invalid, throws an Error.
 */
export default function parseLatex(latex: string): Function {
    // Remove all spaces
    latex = latex.replaceAll(" ", "");

    if (latex.length === 0)
        throw new Error("latex cannot be empty")

    const symbols = splitIntoSymbols(latex);

    return symbolsToFunction(symbols);
}

const SYMBOLS = {
    NUMERIC: "0123456789".split(""),
    OPERAND: "x e \\pi".split(" "),
    BINARY_MID: "+ - ^ \\cdot".split(" "),
    OPEN: "\\left( \\left[ { [".split(" "),
    CLOSE: "\\right) \\right] } ]".split(" "),
    UNARY_PRE: (
        "\\sqrt \\ln " +
        "\\sin \\cos \\tan \\csc \\sec \\cot " +
        "\\arcsin \\arccos \\arctan"
    ).split(" "),
    BINARY_PRE: (
        "\\frac \\ln^ \\log_ " +
        "\\sin^ \\cos^ \\tan^ \\csc^ \\sec^ \\cot^" +
        "\\arcsin^ \\arccos^ \\arctan^"
    ).split(" ")
}

/**
 * Splits the given LaTeX into a list of symbols (numbers, operands, binary mid-operators, groups,
 * unary pre-operators, and binary pre-operators). Returns that list. Throws an Error if there is
 * invalid LaTeX.
 */
function splitIntoSymbols(latex: string): string[] {
    if (latex.length === 0) return [];

    // Handle non-group symbols
    for (const symbol of [
        ...SYMBOLS.NUMERIC,
        ...SYMBOLS.OPERAND,
        ...SYMBOLS.BINARY_MID,
        ...SYMBOLS.BINARY_PRE,
        ...SYMBOLS.UNARY_PRE
    ]) {
        if (latex.startsWith(symbol)) {
            return [symbol, ...splitIntoSymbols(latex.slice(symbol.length))];
        }
    }

    // Handle groups
    let groupIndexInterval = [-1, -1];
    let openCount = 0;
    
    for (let index = 0; index < latex.length; index++) {
        const foundOpenSymbol = SYMBOLS.OPEN.some((openSymbol: string) => {
            if (latex.startsWith(openSymbol, index)) {
                openCount++;

                if (groupIndexInterval[0] === -1) groupIndexInterval[0] = index;
                index += openSymbol.length - 1;

                return true;
            }

            return false;
        });

        if (foundOpenSymbol) continue;

        SYMBOLS.CLOSE.some((closeSymbol: string) => {
            if (latex.endsWith(closeSymbol, index + 1)) {
                openCount--;

                if (openCount < 0) throw new Error(`unmatched ${closeSymbol} at index ${index}`);

                if (openCount === 0) groupIndexInterval[1] = index + 1
                index += closeSymbol.length - 1;

                return true;
            }

            return false;
        });

        if (openCount !== 0) continue;

        if (groupIndexInterval[0] !== -1 && groupIndexInterval[1] !== -1) {
            return [
                ...splitIntoSymbols(latex.slice(0, groupIndexInterval[0])),
                latex.slice(groupIndexInterval[0], groupIndexInterval[1]),
                ...splitIntoSymbols(latex.slice(groupIndexInterval[1]))
            ];
        }
    }

    throw new Error(`invalid LaTeX: ${latex}`);
}

/**
 * Converts the given list of symbols into a Function and returns that Function. Throws an Error if
 * the symbol order is invalid.
 */
function symbolsToFunction(symbols: string[]): Function {
    // Handle addition
    const plusIndex = symbols.indexOf("+");
    if (plusIndex > 0) {
        return new Addition(
            symbolsToFunction(symbols.slice(0, plusIndex)),
            symbolsToFunction(symbols.slice(plusIndex + 1))
        );
    }

    // Handle subtraction and negation
    const minusIndex = symbols.indexOf("-");
    if (minusIndex === 0) {
        return new Negation(symbolsToFunction(symbols.slice(1)));
    } else if (minusIndex > 0) {
        return new Subtraction(
            symbolsToFunction(symbols.slice(0, minusIndex)),
            symbolsToFunction(symbols.slice(minusIndex + 1))
        );
    }

    const functions: Function[] = [];

    while (symbols.length > 0) {
        const symbol = nextSymbol(symbols);

        if (Number.isInteger(+symbol)) { // handle numerical symbols
            functions.push(new Integer(+symbol));
            continue;
        } else if (symbol === "x") {
            functions.push(new Variable());
            continue;
        } else if (symbol === "e" || symbol === "pi") {
            functions.push(new Transcendental(symbol));
            continue;
        } else if (symbol === "\\cdot") {
            continue;
        } else if (symbol === "^") { // handle exponentiation
            if (functions.length === 0) throw new Error("^ does not have a base");
            else if (symbols.length === 0) throw new Error("^ does not have an exponent");

            functions.push(new Exponentiation(
                functions.pop()!,
                symbolsToFunction([nextSymbol(symbols, false)])
            ));
            continue;
        }

        const openSymbolIndex = SYMBOLS.OPEN.findIndex((openSymbol: string) => (
            symbol.startsWith(openSymbol)
        ));
        if (openSymbolIndex !== -1) {
            if (symbol.endsWith(SYMBOLS.CLOSE[openSymbolIndex])) {
                functions.push(parseLatex(symbol.slice(
                    SYMBOLS.OPEN[openSymbolIndex].length,
                    -SYMBOLS.CLOSE[openSymbolIndex].length
                )));
                continue;
            } else {
                throw new Error(`${SYMBOLS.OPEN[openSymbolIndex]} is not closed`);
            }
        }

        if (SYMBOLS.UNARY_PRE.includes(symbol)) {
            if (symbols.length === 0) throw new Error(`${symbol} is given no operands`);
            const nextFunction = symbolsToFunction([nextSymbol(symbols)]);

            if (symbol === "\\sqrt") {
                functions.push(new Root(nextFunction));
            } else if (symbol === "\\ln") {
                functions.push(new Logarithm(nextFunction));
            } else if (symbol === "\\sin") {
                functions.push(new Sine(nextFunction));
            } else if (symbol === "\\cos") {
                functions.push(new Cosine(nextFunction));
            } else if (symbol === "\\tan") {
                functions.push(new Tangent(nextFunction));
            } else if (symbol === "\\csc") {
                functions.push(new Cosecant(nextFunction));
            } else if (symbol === "\\sec") {
                functions.push(new Secant(nextFunction));
            } else if (symbol === "\\cot") {
                functions.push(new Cotangent(nextFunction));
            } else if (symbol === "\\arcsin") {
                functions.push(new Arcsine(nextFunction));
            } else if (symbol === "\\arccos") {
                functions.push(new Arccosine(nextFunction));
            } else { // symbol === "\\arctan"
                functions.push(new Arctangent(nextFunction));
            }
        } else if (SYMBOLS.BINARY_PRE.includes(symbol)) {
            if (symbols.length <= 1) throw new Error(`${symbol} is given less than 2 operands`);
            const nextFunction = symbolsToFunction([nextSymbol(symbols)]);
            const nextNextFunction = symbolsToFunction([nextSymbol(symbols)]);

            if (symbol === "\\frac") {
                functions.push(new Division(nextFunction, nextNextFunction));
            } else if (symbol === "\\ln^") {
                functions.push(new Exponentiation(
                    new Logarithm(nextNextFunction),
                    nextFunction
                ));
            } else if (symbol === "\\log_") {
                if (!(nextFunction instanceof Constant)) {
                    throw new Error("\\log_ can only have constant bases");
                }

                functions.push(new Logarithm(nextNextFunction, nextFunction));
            } else if (symbol === "\\sin^") {
                functions.push(new Exponentiation(
                    new Sine(nextNextFunction),
                    nextFunction
                ));
            } else if (symbol === "\\cos^") {
                functions.push(new Exponentiation(
                    new Cosine(nextNextFunction),
                    nextFunction
                ));
            } else if (symbol === "\\tan^") {
                functions.push(new Exponentiation(
                    new Tangent(nextNextFunction),
                    nextFunction
                ));
            } else if (symbol === "\\csc^") {
                functions.push(new Exponentiation(
                    new Cosecant(nextNextFunction),
                    nextFunction
                ));
            } else if (symbol === "\\sec^") {
                functions.push(new Exponentiation(
                    new Secant(nextNextFunction),
                    nextFunction
                ));
            } else if (symbol === "\\cot^") {
                functions.push(new Exponentiation(
                    new Cotangent(nextNextFunction),
                    nextFunction
                ));
            } else if (symbol === "\\arcsin^") {
                functions.push(new Exponentiation(
                    new Arcsine(nextNextFunction),
                    nextFunction
                ));
            } else if (symbol === "\\arccos^") {
                functions.push(new Exponentiation(
                    new Arccosine(nextNextFunction),
                    nextFunction
                ));
            } else if (symbol === "\\arctan^") {
                functions.push(new Exponentiation(
                    new Arctangent(nextNextFunction),
                    nextFunction
                ));
            }
        } else {
            throw new Error(`invalid symbol ${symbol}`);
        }
    }

    if (functions.length === 1) {
        return functions[0];
    } else { // Join functions as factors
        return new Multiplication(...functions);
    }
}

/**
 * Returns the next symbol from the given symbols. Removes that symbol from the list. If
 * combineDigits is true, combines consecutive numeric symbols into one symbol.
 */
function nextSymbol(symbols: string[], combineDigits = true): string {
    let symbol = symbols.shift()!;

    if (combineDigits && SYMBOLS.NUMERIC.includes(symbol)) {
        while (symbols.length > 0 && SYMBOLS.NUMERIC.includes(symbols[0])) {
            symbol += symbols.shift();
        }
    }

    return symbol;
}