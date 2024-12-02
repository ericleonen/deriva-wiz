import Function from "../../Function";
import Integer from "../../operands/Integer";

/**
 * A unary negation operator.
 */
export default class Negation extends Function {
    private readonly inner: Function;

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

    public get latex(): string {
        return `-${this.inner.latex}`;
    }
}