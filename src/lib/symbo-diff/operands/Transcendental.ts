import Constant from "./Constant";

/**
 * A transcendental (e or pi) operand.
 */
export default class Transcendental extends Constant {
    /**
     * Initializes a transcendental operand with specification of either e or pi.
     */
    public constructor(value: "e" | "pi") {
        super(value === "e" ? Math.E : Math.PI);
    }

    public get latex(): string {
        return this.value === Math.E ? "e" : "\\pi";
    }
}