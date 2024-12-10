import Function from "../../Function";
import Integer from "../../operands/Integer";
import Negation from "./Negation";
import Subtraction from "./Subtraction";

/**
 * A binary addition operator.
 */
export default class Addition extends Function {
    private readonly left: Function;
    private readonly right: Function;

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
        if (this.right instanceof Negation) {
            return new Subtraction(this.left, this.right.inner);
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