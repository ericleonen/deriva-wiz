import Function from "../../Function";
import Integer from "../../operands/Integer";
import Multiplication from "../basic/Multiplication";
import Tangent from "./Tangent";

export default class Secant extends Function {
    private readonly inner: Function;

    /**
     * Initializes a secant operator acting on the given operand.
     */
    public constructor(inner: Function) {
        super(inner);

        this.inner = inner;
    }

    public eval(x: number): number | undefined {
        const evalInner = this.inner.eval(x);

        if (evalInner !== undefined) {
            const result = 1 / Math.cos(evalInner);

            if (isFinite(result)) return result;
        }

        return undefined;
    }

    public get derivative(): Function {
        if (this.isConstant) return new Integer(0);

        return new Multiplication(this, new Tangent(this.inner), this.inner.derivative);
    }

    public get latex(): string {
        return `\\sec\\left(${this.inner.latex}\\right)`
    }
}