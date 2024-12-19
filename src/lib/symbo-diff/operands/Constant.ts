import Integer from "./Integer";
import Function from "../Function";

/**
 * A constant operand.
 */
export default class Constant extends Function {
    readonly value: number;

    /**
     * Initializes a constand operand with the given value.
     */
    public constructor(value: number) {
        super();

        this.value = value;
    }

    public eval(x: number): number {
        if (Number.isFinite(x)) return this.value;
        else throw new Error();
    }

    public get derivative(): Function {
        return new Integer(0);
    }

    public get latex(): string {
        return `${this.value}`;
    }
}