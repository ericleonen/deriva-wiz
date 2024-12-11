import Function from "../../Function";
import Constant from "../../operands/Constant";
import Division from "../basic/Division";
import Multiplication from "../basic/Multiplication";

/**
 * A binary logarithm operator.
 */
export default class Logarithm extends Function {
    public inner: Function;
    public base?: Constant;

    /**
     * Initializes a logrithm operator acting on the given operand and (optional) base. If no base
     * is given, defaults to e. If given a non-positive base, throws an Error.
     */
    public constructor(inner: Function, base?: Constant) {
        super(inner);

        this.inner = inner;

        if (base) {
            if (base.value <= 0)
                throw new Error("base must be positive");

            this.base = base;
        }
    }

    public eval(x: number): number | undefined {
        const evalInner = this.inner.eval(x);

        if (evalInner && evalInner > 0) {
            if (!this.base) {
                return Math.log(evalInner);
            } else {
                return Math.log(x) / Math.log(this.base.value);
            }
        }

        return undefined;
    }

    public get derivative(): Function {
        if (!this.base) { // ln case
            return new Division(this.inner.derivative, this.inner);
        } else {
            return new Division(
                this.inner.derivative,
                new Multiplication(this.inner, new Logarithm(this.base))
            );
        }
    }

    public get simplified(): Function {
        this.inner = this.inner.simplified;

        return this;
    }

    public get latex(): string {
        if (!this.base) {
            return `\\ln\\left(${this.inner.latex}\\right)`;
        } else {
            return `\\log_{${this.base.latex}}\\left(${this.inner.latex}\\right)`;
        }
    }
}