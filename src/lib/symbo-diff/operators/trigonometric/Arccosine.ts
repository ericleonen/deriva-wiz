import Function from "../../Function";
import Integer from "../../operands/Integer";
import Division from "../basic/Division";
import Negation from "../basic/Negation";
import Root from "../basic/Root";
import Subtraction from "../basic/Subtraction";
import Exponentiation from "../exponential/Exponentiation";

export default class Arccosine extends Function {
    private inner: Function;

    /**
     * Initializes an arccosine operator acting on the given operand.
     */
    public constructor(inner: Function) {
        super(inner);

        this.inner = inner;
    }

    public eval(x: number): number | undefined {
        const evalInner = this.inner.eval(x);

        if (evalInner !== undefined) {
            const result = Math.acos(evalInner);

            if (isFinite(result)) return result;
        }

        return undefined;
    }

    public get derivative(): Function {
        if (this.isConstant) return new Integer(0);

        return new Negation(
            new Division(
                this.inner.derivative,
                new Root(new Subtraction(
                    new Integer(1),
                    new Exponentiation(this.inner, new Integer(2))
                ))
            )
        );
    }

    public get simplified(): Function {
        this.inner = this.inner.simplified;

        return this;
    }

    public get latex(): string {
        return `\\arccos\\left(${this.inner.latex}\\right)`
    }
}