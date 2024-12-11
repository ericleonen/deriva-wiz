import Function from "../../Function";
import Multiplication from "./Multiplication";
import Subtraction from "./Subtraction";
import Integer from "../../operands/Integer";
import Exponentiation from "../exponential/Exponentiation";
import Negation from "./Negation";

/**
 * A binary division operator.
 */
export default class Division extends Function {
    private top: Function;
    private bottom: Function;

    /**
     * Initializes a division operator acting on the given numerator and denominator.
     */
    public constructor(top: Function, bottom: Function) {
        super(top, bottom);

        this.top = top;
        this.bottom = bottom;
    }

    public eval(x: number): number | undefined {
        const bottomEval = this.bottom.eval(x);
        
        if (bottomEval) { // bottom is defined and non-zero
            const topEval = this.top.eval(x);

            if (topEval !== undefined) return topEval / bottomEval;
        }

        return undefined;
    }

    public get derivative(): Function {
        if (this.isConstant) return new Integer(0);
        else if (this.top.isConstant) {
            return new Negation(new Division(
                new Multiplication(this.top, this.bottom.derivative),
                new Exponentiation(this.bottom, new Integer(2))
            ))
        }

        return new Division(
            new Subtraction(
                new Multiplication(this.top.derivative, this.bottom),
                new Multiplication(this.top, this.bottom.derivative)
            ),
            new Exponentiation(this.bottom, new Integer(2))
        )
    }

    public get simplified(): Function {
        this.top = this.top.simplified;
        this.bottom = this.bottom.simplified;

        if (this.top instanceof Negation && this.bottom instanceof Negation) {
            this.top = this.top.inner;
            this.bottom = this.bottom.inner;
        } else if (this.top instanceof Negation) {
            this.top = this.top.inner;
            return new Negation(this);
        } else if (this.bottom instanceof Negation) {
            this.bottom = this.bottom.inner;
            return new Negation(this);
        }

        return this;
    }

    public get latex(): string {
        return `\\frac{${this.top.latex}}{${this.bottom.latex}}`;
    }
}