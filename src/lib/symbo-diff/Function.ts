import { IS_EQUAL_NUM_SAMPLES, IS_EQUAL_TOLERANCE, IS_EQUAL_UPPER_BOUND } from "./config";
import Constant from "./operands/Constant";

/**
 * A differentiable univariate function. 
 */
export default abstract class Function {
    public isConstant: boolean;
    // TODO: Decide a way to store the domain of a function

    /**
     * Initializes a function with the given operands.
     */
    public constructor(...operands: Function[]) {
        this.isConstant = operands.every(operand => (
            operand instanceof Constant || operand.isConstant
        ));
    }

    /**
     * Evaluates this function at the given number and returns the output. Returns undefined if the
     * given number is outside of this function's domain.
     */
    public abstract eval(x: number): number | undefined;

    /**
     * Returns the derivative of this Function.
     */
    public abstract get derivative(): Function; // TODO: Decide if memoization is needed

    /**
     * Returns a simplified version of this Function.
     */
    public get simplified(): Function { // TODO: Decide if memoization is needed
        return this;
    }

    /**
     * Returns this function as a Latex expression
     */
    public abstract get latex(): string; // TODO: Decide if memoization is needed

    /**
     * Returns true if this Function is equivalent to the given Function, false otherwise.
     */
    public equals(other: Function): boolean {
        for (let i = 0; i < IS_EQUAL_NUM_SAMPLES; i++) {
            const x = Math.random() * 2*IS_EQUAL_UPPER_BOUND - IS_EQUAL_UPPER_BOUND;

            const thisY = this.eval(x);
            const otherY = other.eval(x);

            if (thisY !== undefined && otherY !== undefined) {
                const maxMagnitude = Math.max(Math.abs(thisY), Math.abs(otherY));

                if (Math.abs(thisY - otherY) / maxMagnitude > IS_EQUAL_TOLERANCE) {
                    console.log(`x=${x}, diff=${Math.abs(thisY - otherY)}`)
                    return false;
                }
            }
        }

        return true;
    }
}