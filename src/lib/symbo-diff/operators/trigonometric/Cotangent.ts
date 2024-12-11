import Function from "../../Function";
import Integer from "../../operands/Integer";
import Multiplication from "../basic/Multiplication";
import Negation from "../basic/Negation";
import Exponentiation from "../exponential/Exponentiation";
import Cosecant from "./Cosecant";

export default class Cotangent extends Function {
    private inner: Function;

    /**
     * Initializes a cotangent operator acting on the given operand.
     */
    public constructor(inner: Function) {
        super(inner);

        this.inner = inner;
    }

    public eval(x: number): number | undefined {
        const evalInner = this.inner.eval(x);

        if (evalInner !== undefined) {
            const result = 1 / Math.tan(evalInner);

            if (isFinite(result)) return result;
        }

        return undefined;
    }

    public get derivative(): Function {
        if (this.isConstant) return new Integer(0);

        return new Negation(
            new Multiplication(
                new Exponentiation(new Cosecant(this.inner), new Integer(2)),
                this.inner.derivative
            )
        )
    }

    public get simplified(): Function {
        this.inner = this.inner.simplified;

        return this;
    }

    public get latex(): string {
        return `\\cot\\left(${this.inner.latex}\\right)`
    }
}