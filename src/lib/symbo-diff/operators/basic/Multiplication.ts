import Function from "../../Function";
import Constant from "../../operands/Constant";
import Integer from "../../operands/Integer";
import Variable from "../../operands/Variable";
import { parenthesize } from "../../utils";
import Exponentiation from "../exponential/Exponentiation";
import Addition from "./Addition";
import Negation from "./Negation";
import Subtraction from "./Subtraction";

/**
 * A binary multiplication operator.
 */
export default class Multiplication extends Function {
    private left: Function;
    private right: Function;

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

    public get simplified(): Function {
        this.left = this.left.simplified;
        this.right = this.right.simplified;

        if (this.right instanceof Variable) {
            if (this.left instanceof Variable) {
                return new Exponentiation(this.left, new Integer(2));
            } else if (!this.left.isConstant) {
                [this.right, this.left] = [this.left, this.right];
            }
        } else if (this.left instanceof Variable && this.right.isConstant) {
            [this.right, this.left] = [this.left, this.right];
        } else if (this.right instanceof Negation) {
            if (this.left instanceof Negation) {
                this.left = this.left.inner;
                this.right = this.right.inner;
            }
        }

        return this;
    }

    public get latex(): string {
        if (
            this.right instanceof Integer || (
            this.left instanceof Integer && (
                (this.right instanceof Multiplication && this.right.left instanceof Integer) ||
                (this.right instanceof Exponentiation && this.right.base instanceof Integer)
            )
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
            this.right instanceof Negation || (
                this.right instanceof Multiplication && this.right.left instanceof Exponentiation &&
                this.right.left.base instanceof Integer
            )
        );

        return `${leftLatex}${rightLatex}`;
    }
}