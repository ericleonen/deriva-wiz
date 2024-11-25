import Integer from "../operands/Integer";
import Function from "../Function";

/**
 * A variable "x".
 */
export default class Variable extends Function {
    public eval(x: number): number {
        return x;
    }

    public get derivative(): Function {
        return new Integer(1);
    }

    public get latex(): string {
        return "x";
    }
}