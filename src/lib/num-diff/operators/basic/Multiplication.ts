import Function from "../../Function";
import Integer from "../../operands/Integer";
import Addition from "./Addition";

/**
 * A binary multiplication operator.
 */
export default class Multiplication extends Function {
    private readonly left: Function;
    private readonly right: Function;

    /**
     * Initializes a multiplication operator acting on the given multiplicand and multiplier.
     */
    public constructor(left: Function, right: Function) {
        super(left, right);

        this.left = left;
        this.right = right;
    }

    public eval(x: number): number | undefined {
        const evalLeft = this.left.eval(x);

        if (evalLeft !== undefined) {
            const evalRight = this.right.eval(x);

            if (evalRight !== undefined) return evalLeft * evalRight;
        }

        return undefined;
    }

    public get derivative(): Function {
        if (this.isConstant) return new Integer(0);

        return new Addition(
            new Multiplication(this.left, this.right.derivative),
            new Multiplication(this.left.derivative, this.right)
        );
    }

    public get latex(): string {
        return `${this.left}${this.right}`;
    }
}