import Function from "../Function";

/**
 * An addition expression.
 */
export default class Addition extends Function {
    /**
     * The left addend of this addition expression.
     */
    private readonly left: Function;
    /**
     * The right addend of this addition expression.
     */
    private readonly right: Function;

    /**
     * Creates an addition expression with the given addends.
     */
    public constructor(left: Function, right: Function) {
        super();

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

    public get derivative(): Function {
        return new Addition(this.left.derivative, this.right.derivative);
    }

    public get latex(): string {
        return `${this.left.latex}+${this.right.latex}`
    }
}