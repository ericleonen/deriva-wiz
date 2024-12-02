import Function from "../../Function";
import Integer from "../../operands/Integer";
import { parenthesize } from "../../utils";
import Addition from "./Addition";
import Negation from "./Negation";
import Subtraction from "./Subtraction";

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
        else if (this.left.isConstant) return new Multiplication(this.left, this.right.derivative);
        else if (this.right.isConstant) return new Multiplication(this.right, this.left.derivative);

        return new Addition(
            new Multiplication(this.left, this.right.derivative),
            new Multiplication(this.left.derivative, this.right)
        );
    }

    public get latex(): string {
        if (
            this.right instanceof Integer || (
            this.left instanceof Integer && 
            this.right instanceof Multiplication && this.right.left instanceof Integer
        )) {
            return `${this.left.latex}\\cdot${this.right.latex}`;
        }

        const leftLatex = parenthesize(
            this.left.latex,
            this.left instanceof Addition || this.left instanceof Subtraction
        );
        const rightLatex = parenthesize(
            this.right.latex,
            this.right instanceof Addition || this.right instanceof Subtraction || 
            this.right instanceof Negation
        );

        return `${leftLatex}${rightLatex}`;
    }
}