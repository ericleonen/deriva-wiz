import Function from "../../Function";
import Integer from "../../operands/Integer";
import Multiplication from "../basic/Multiplication";
import Cosine from "./Cosine";

export default class Sine extends Function {
    private inner: Function;

    /**
     * Initializes a sine operator acting on the given operand.
     */
    public constructor(inner: Function) {
        super(inner);

        this.inner = inner;
    }

    public eval(x: number): number | undefined {
        const evalInner = this.inner.eval(x);

        if (evalInner !== undefined) {
            const result = Math.sin(evalInner);

            if (isFinite(result)) return result;
        }

        return undefined;
    }

    public get derivative(): Function {
        if (this.isConstant) return new Integer(0);

        return new Multiplication(new Cosine(this.inner), this.inner.derivative);
    }

    public get simplified(): Function {
        this.inner = this.inner.simplified;

        return this;
    }

    public get latex(): string {
        return `\\sin\\left(${this.inner.latex}\\right)`;
    }
}