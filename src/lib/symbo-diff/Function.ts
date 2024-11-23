/**
 * A differentiable univariate function. 
 */
export default abstract class Function {
    // TODO: Decide a way to store the domain of a function

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
        // TODO: Implement a satisfactory equality check
        return false;
    }
}