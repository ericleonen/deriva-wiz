import Function from "../../Function";
import Integer from "../../operands/Integer";
import Addition from "./Addition";

/**
 * A binary subtraction operator.
 */
export default class Subtraction extends Function {
    private readonly left: Function;
    private readonly right: Function;

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

    public get latex(): string {
        let rightLatex = this.right.latex;

        if (this.right instanceof Addition || this.right instanceof Subtraction) {
            rightLatex = `\\left(${rightLatex}\\right)`;
        }

        return `${this.left.latex}-${rightLatex}`
    }
}