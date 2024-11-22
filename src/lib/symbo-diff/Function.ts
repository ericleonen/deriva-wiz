/**
 * A differentiable univariate function. 
 */
export default abstract class Function {
    public abstract eval(x: number): number | undefined;
    public abstract get derivative(): Function; // TODO: Decide if memoization is needed
    public abstract get simplified(): Function; // TODO: Decide if memoization is needed
    public abstract get latex(): string; // TODO: Decide if memoization is needed

    /**
     * Returns an equivalent copy of this Function.
     */
    public abstract get copy(): Function

    /**
     * Returns true if this Function is equivalent to the given Function, false otherwise.
     */
    public equals(other: Function): boolean {
        // TODO: Implement a satisfactory equality check
        return false;
    }
}