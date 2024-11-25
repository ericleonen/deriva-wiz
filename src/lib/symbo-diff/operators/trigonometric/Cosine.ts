import Function from "../../Function";
import Multiplication from "../basic/Multiplication";
import Negation from "../basic/Negation";
import Sine from "./Sine";

export default class Cosine extends Function {
    private readonly inner: Function;

    /**
     * Initializes a cosine operator acting on the given operand.
     */
    public constructor(inner: Function) {
        super(inner);

        this.inner = inner;
    }

    public eval(x: number): number | undefined {
        const evalInner = this.inner.eval(x);

        if (evalInner !== undefined) {
            const result = Math.cos(evalInner);

            if (isFinite(result)) return result;
        }

        return undefined;
    }

    public get derivative(): Function {
        return new Negation(
            new Multiplication(new Sine(this.inner), this.inner.derivative)
        );
    }

    public get latex(): string {
        return `\\cos\\left(${this.inner.latex}\\right)`
    }
}