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
     * Initializes a multiplication operator acting on the given factors. If given less than 2
     * factors, throws an Error.
     */
    public constructor(...factors: Function[]) {
        if (factors.length === 2) {
            super(factors[0], factors[1]);

            this.left = factors[0];
            this.right = factors[1];
        } else if (factors.length > 2) {
            const right = new Multiplication(...factors.slice(1));
            
            super(factors[0], right);

            this.left = factors[0];
            this.right = right;
        } else {
            throw new Error("there must be at least 2 factors");
        }
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
        if (this.left instanceof Integer && this.right instanceof Integer) {
            return `${this.left.latex}\\cdot${this.right.latex}`;
        }

        return `${this.left.latex}${this.right.latex}`;
    }
}