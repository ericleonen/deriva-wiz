import Function from "../../Function";
import Integer from "../../operands/Integer";
import Multiplication from "../basic/Multiplication";
import Exponentiation from "../exponential/Exponentiation";
import Secant from "./Secant";

export default class Tangent extends Function {
    private inner: Function;

    /**
     * Initializes a tangent operator acting on the given operand.
     */
    public constructor(inner: Function) {
        super(inner);

        this.inner = inner;
    }

    public eval(x: number): number | undefined {
        const evalInner = this.inner.eval(x);

        if (evalInner !== undefined) {
            const result = Math.tan(evalInner);

            if (isFinite(result)) return result;
        }

        return undefined;
    }

    public get derivative(): Function {
        if (this.isConstant) return new Integer(0);

        return new Multiplication(
            new Exponentiation(new Secant(this.inner), new Integer(2)),
            this.inner.derivative
        )
    }

    public get simplified(): Function {
        this.inner = this.inner.simplified;

        return this;
    }

    public get latex(): string {
        return `\\tan\\left(${this.inner.latex}\\right)`
    }
}