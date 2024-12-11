import Function from "../../Function";
import Integer from "../../operands/Integer";
import Variable from "../../operands/Variable";
import Multiplication from "./Multiplication";
import Negation from "./Negation";
import Subtraction from "./Subtraction";

/**
 * A binary addition operator.
 */
export default class Addition extends Function {
    private left: Function;
    private right: Function;

    /**
     * Initializes an addition operator acting on the given addends.
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

            if (evalRight !== undefined) return evalLeft + evalRight;
        }

        return undefined;
    }

    public get simplified(): Function {
        this.left = this.left.simplified;
        this.right = this.right.simplified;

        if (this.right instanceof Negation) {
            return new Subtraction(this.left, this.right.inner);
        } else if (this.left instanceof Variable && this.right instanceof Variable) {
            return new Multiplication(new Integer(2), this.left);
        }

        return this;
    }

    public get derivative(): Function {
        if (this.isConstant) return new Integer(0);

        return new Addition(this.left.derivative, this.right.derivative);
    }

    public get latex(): string {
        return `${this.left.latex}+${this.right.latex}`
    }
}