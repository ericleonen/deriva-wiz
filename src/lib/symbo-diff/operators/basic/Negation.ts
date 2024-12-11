import Function from "../../Function";
import Integer from "../../operands/Integer";
import { parenthesize } from "../../utils";
import Addition from "./Addition";
import Subtraction from "./Subtraction";

/**
 * A unary negation operator.
 */
export default class Negation extends Function {
    public inner: Function;

    /**
     * Initializes a negation operator acting on the given operand.
     */
    public constructor(inner: Function) {
        super(inner);

        this.inner = inner;
    }

    public eval(x: number): number | undefined {
        const evalInner = this.inner.eval(x);

        if (evalInner !== undefined) return -evalInner;

        return undefined;
    }

    public get derivative(): Function {
        if (this.isConstant) return new Integer(0);

        return new Negation(this.inner.derivative);
    }

    public get simplified(): Function {
        this.inner = this.inner.simplified;

        if (this.inner instanceof Negation) {
            return this.inner.inner;
        }

        return this;
    }

    public get latex(): string {
        const innerLatex = parenthesize(
            this.inner.latex, 
            this.inner instanceof Addition || this.inner instanceof Subtraction
        );

        return `-${innerLatex}`;
    }
}