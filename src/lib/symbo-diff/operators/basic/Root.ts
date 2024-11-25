import Integer from "../../operands/Integer";
import Function from "../../Function";
import Division from "./Division";
import Multiplication from "./Multiplication";
import Exponentiation from "../exponential/Exponentiation";
import Negation from "./Negation";

/**
 * A binary root operator.
 */
export default class Root extends Function {
    private readonly radical?: Integer;
    private readonly inner: Function;

    /**
     * Initializes a root operator acting on the given (optional) radical and operand. If no
     * radical is given, defaults to 2. If the given radical isn't positive, throws an Error.
     */
    public constructor(radicalOrInner: Integer | Function, inner?: Function) {
        if (radicalOrInner instanceof Integer) {
            if (!inner) throw new Error("inner must be given");
            else if (radicalOrInner.value <= 1) throw new Error("radical must be greater than 1");

            super(inner);

            this.radical = radicalOrInner;
            this.inner = inner;
        } else { // radicalOrInner instanceOf Function
            if (inner) throw new Error("radical must be an integer");

            super(radicalOrInner);

            this.inner = radicalOrInner;
        }
    }

    public eval(x: number): number | undefined {
        const evalInner = this.inner.eval(x);

        if (evalInner !== undefined) {
            let result: number;

            if (!this.radical) {
                result = Math.sqrt(evalInner);
            } else {
                result = evalInner**(1/this.radical.value);
            }

            if (isFinite(result)) {
                return result;
            }
        }

        return undefined;
    }

    public get derivative(): Function {
        if (this.isConstant) return new Integer(0);

        if (!this.radical) { // square root case
            return new Division(
                this.inner.derivative,
                new Multiplication(new Integer(2), this)
            );
        } else { // n-root case
            return new Multiplication(
                new Division(new Integer(1), this.radical),
                new Multiplication(
                    new Exponentiation(
                        this,
                        new Negation(
                            new Division(new Integer(this.radical.value - 1), this.radical)
                        )
                    ),
                    this.inner.derivative
                )
            );
        }
    }

    public get latex(): string {
        if (!this.radical) {
            return `\\sqrt{${this.inner.latex}}`;
        } else {
            return `\\sqrt[${this.radical.latex}]{${this.inner.latex}}`;
        }
    }
}