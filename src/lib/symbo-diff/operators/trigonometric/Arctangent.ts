import Function from "../../Function";
import Integer from "../../operands/Integer";
import Addition from "../basic/Addition";
import Division from "../basic/Division";
import Exponentiation from "../exponential/Exponentiation";

export default class Arctangent extends Function {
    private readonly inner: Function;

    /**
     * Initializes an arctangent operator acting on the given operand.
     */
    public constructor(inner: Function) {
        super(inner);

        this.inner = inner;
    }

    public eval(x: number): number | undefined {
        const evalInner = this.inner.eval(x);

        if (evalInner !== undefined) {
            const result = Math.atan(evalInner);

            if (isFinite(result)) return result;
        }

        return undefined;
    }

    public get derivative(): Function {
        if (this.isConstant) return new Integer(0);

        return new Division(
            this.inner.derivative,
            new Addition(
                new Integer(1),
                new Exponentiation(this.inner, new Integer(2))
            )
        );
    }

    public get latex(): string {
        return `\\arctan\\left(${this.inner.latex}\\right)`
    }
}