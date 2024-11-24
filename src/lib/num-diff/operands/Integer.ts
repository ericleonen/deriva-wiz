import Constant from "./Constant";

/**
 * An integer operand.
 */
export default class Integer extends Constant {
    /**
     * Initializes an integer operand with the given value. Throws an Error if the given value is
     * not an integer.
     */
    public constructor(integer: number) {
        super(integer);

        if (!Number.isInteger(integer))
            throw new Error(`given value is not an integer: ${integer}`);
    }
}