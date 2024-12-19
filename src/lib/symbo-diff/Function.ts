import { IS_EQUAL_NUM_SAMPLES, IS_EQUAL_TOLERANCE, IS_EQUAL_UPPER_BOUND } from "./config";
import Constant from "./operands/Constant";

/**
 * A differentiable univariate function. 
 */
export default abstract class Function {
    public isConstant: boolean;
    public hasFraction: boolean;

    /**
     * Initializes a function with the given operands.
     */
    public constructor(...operands: Function[]) {
        this.isConstant = operands.every(operand => (
            operand instanceof Constant || operand.isConstant
        ));

        this.hasFraction = operands.some(operand => (
            operand.hasOwnProperty("top") || operand.hasFraction
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
     * Returns true if this Function is equivalent to the given Function, false otherwise. Half of
     * the samples are chosen randomly, the other half come at evenly spaced intervals.
     */
    public equals(other: Function): boolean {
        let domainMismatchCount = 0;

        for (let i = 0; i < IS_EQUAL_NUM_SAMPLES; i++) {
            let x: number;

            if (i < IS_EQUAL_NUM_SAMPLES / 2) {
                x = i*2*IS_EQUAL_UPPER_BOUND / IS_EQUAL_NUM_SAMPLES;
            } else {
                x = Math.random() * 2*IS_EQUAL_UPPER_BOUND - IS_EQUAL_UPPER_BOUND;
            }

            const thisY = this.eval(x);
            const otherY = other.eval(x);

            if (thisY !== undefined && otherY !== undefined) {
                const maxMagnitude = Math.max(1, Math.max(Math.abs(thisY), Math.abs(otherY)));

                if (Math.abs(thisY - otherY) / maxMagnitude > IS_EQUAL_TOLERANCE) {
                    // console.log(`Relative difference of ${Math.abs(thisY - otherY) / maxMagnitude} at x=${x}`);
                    return false;
                }
            } else if (
                (thisY === undefined && otherY !== undefined) ||
                (otherY === undefined && thisY !== undefined)
            ) {
                domainMismatchCount++;
            }
        }

        if (domainMismatchCount >= IS_EQUAL_NUM_SAMPLES * 0.5) {
            // console.log("Domain mismatches: " + domainMismatchCount);
            return false;
        } else {
            return true;
        }
    }

    public isProportionalTo(other: Function): boolean {
        let factor: number | null = null;

        for (let i = 0; i < IS_EQUAL_NUM_SAMPLES; i++) {
            const x = Math.random() * 2*IS_EQUAL_UPPER_BOUND - IS_EQUAL_UPPER_BOUND;

            const thisY = this.eval(x);
            const otherY = other.eval(x);

            if (thisY !== undefined && otherY !== undefined) {
                if (factor === null) factor = thisY / otherY;
                else if (Math.abs(thisY / otherY - factor) > IS_EQUAL_TOLERANCE) {
                    return false;
                }
            }
        }

        return true;
    }
}