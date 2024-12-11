import Function from "../../Function";
import Integer from "../../operands/Integer";
import Addition from "./Addition";
import Negation from "./Negation";

/**
 * A binary subtraction operator.
 */
export default class Subtraction extends Function {
    private left: Function;
    private right: Function;

    /**
     * Initializes an subtraction operator acting on the given minuend and subtrahend.
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

            if (evalRight !== undefined) return evalLeft - evalRight;
        }

        return undefined;
    }

    public get derivative(): Function {
        if (this.isConstant) return new Integer(0);

        return new Subtraction(this.left.derivative, this.right.derivative);
    }

    public get simplified(): Function {
        this.left = this.left.simplified;
        this.right = this.right.simplified;

        if (this.right instanceof Negation) {
            return new Addition(this.left, this.right.inner);
        }

        return this;
    }

    public get latex(): string {
        let rightLatex = this.right.latex;

        if (this.right instanceof Addition || this.right instanceof Subtraction) {
            rightLatex = `\\left(${rightLatex}\\right)`;
        }

        return `${this.left.latex}-${rightLatex}`
    }
}