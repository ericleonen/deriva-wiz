import Function from "../../Function";
import Integer from "../../operands/Integer";
import Multiplication from "../basic/Multiplication";
import Negation from "../basic/Negation";
import Cotangent from "./Cotangent";

export default class Cosecant extends Function {
    private readonly inner: Function;

    /**
     * Initializes a cosecant operator acting on the given operand.
     */
    public constructor(inner: Function) {
        super(inner);

        this.inner = inner;
    }

    public eval(x: number): number | undefined {
        const evalInner = this.inner.eval(x);

        if (evalInner !== undefined) {
            const result = 1 / Math.sin(evalInner);

            if (isFinite(result)) return result;
        }

        return undefined;
    }

    public get derivative(): Function {
        if (this.isConstant) return new Integer(0);

        return new Negation(
            new Multiplication(this, new Cotangent(this.inner), this.inner.derivative)
        )
    }

    public get latex(): string {
        return `\\csc\\left(${this.inner.latex}\\right)`
    }
}