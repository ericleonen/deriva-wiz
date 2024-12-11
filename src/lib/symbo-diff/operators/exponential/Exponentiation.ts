import Function from "../../Function";
import Constant from "../../operands/Constant";
import Integer from "../../operands/Integer";
import Variable from "../../operands/Variable";
import Addition from "../basic/Addition";
import Division from "../basic/Division";
import Multiplication from "../basic/Multiplication";
import Subtraction from "../basic/Subtraction";
import Arccosine from "../trigonometric/Arccosine";
import Arcsine from "../trigonometric/Arcsine";
import Arctangent from "../trigonometric/Arctangent";
import Cosecant from "../trigonometric/Cosecant";
import Cosine from "../trigonometric/Cosine";
import Cotangent from "../trigonometric/Cotangent";
import Secant from "../trigonometric/Secant";
import Sine from "../trigonometric/Sine";
import Tangent from "../trigonometric/Tangent";
import Logarithm from "./Logarithm";

/**
 * A binary exponentiation operator.
 */
export default class Exponentiation extends Function {
    public base?: Function;
    public exponent: Function;

    /**
     * Initializes a exponentiation operator acting on the given (optional) base and exponent. If
     * no base is given, defaults to e.
     */
    public constructor(baseOrExponent: Function, exponent?: Function) {
        if (exponent) {
            super(baseOrExponent, exponent);

            this.base = baseOrExponent;
            this.exponent = exponent;
        } else {
            super(baseOrExponent);

            this.exponent = baseOrExponent;
        }
    }

    public eval(x: number): number | undefined {
        const evalExponent = this.exponent.eval(x);

        if (evalExponent !== undefined) {
            const evalBase = this.base ? this.base.eval(x) : Math.E;

            if (evalBase !== undefined) {
                const result = evalBase**evalExponent;

                if (isFinite(result)) return result;
            }
        }

        return undefined;
    }

    public get derivative(): Function {
        if (
            this.isConstant || 
            (this.exponent.isConstant && this.exponent.eval(0) === 0)
        ) return new Integer(0);

        if (this.exponent.isConstant && this.base) { // power rule case
            return new Multiplication(
                this.exponent,
                new Exponentiation(
                    this.base,
                    new Subtraction(this.exponent, new Integer(1))
                ),
                this.base.derivative
            )
        } else if (!this.base) { // base e case
            return new Multiplication(this, this.exponent.derivative);
        } else if (this.base.isConstant) {
            return new Multiplication(
                this, 
                new Multiplication(
                    new Logarithm(this.base),
                    this.exponent.derivative
                )
            );
        } else { // f(x)^g(x) case
            return new Multiplication(
                this,
                new Addition(
                    new Multiplication(
                        new Logarithm(this.base),
                        this.exponent.derivative
                    ),
                    new Multiplication(
                        new Division(this.exponent, this.base),
                        this.base.derivative
                    )
                )
            )
        }
    }

    public get simplified(): Function {
        this.base = this.base?.simplified;
        this.exponent = this.exponent.simplified;

        return this;
    }

    public get latex(): string {
        if (!this.base) {
            return `e^{${this.exponent.latex}}`;
        } else if (this.base instanceof Constant || this.base instanceof Variable) {
            return `${this.base.latex}^{${this.exponent.latex}}`;
        } else if (this.exponent instanceof Integer && this.exponent.value > 1) {
            if (this.base instanceof Logarithm && !this.base.base) {
                return this.base.latex.replace("\\ln", `\\ln^{${this.exponent.latex}}`);
            } else if (this.base instanceof Sine) {
                return this.base.latex.replace("\\sin", `\\sin^{${this.exponent.latex}}`);
            } else if (this.base instanceof Cosine) {
                return this.base.latex.replace("\\cos", `\\cos^{${this.exponent.latex}}`);
            } else if (this.base instanceof Tangent) {
                return this.base.latex.replace("\\tan", `\\tan^{${this.exponent.latex}}`);
            } else if (this.base instanceof Cosecant) {
                return this.base.latex.replace("\\csc", `\\csc^{${this.exponent.latex}}`);
            } else if (this.base instanceof Secant) {
                return this.base.latex.replace("\\sec", `\\sec^{${this.exponent.latex}}`);
            } else if (this.base instanceof Cotangent) {
                return this.base.latex.replace("\\cot", `\\cot^{${this.exponent.latex}}`);
            } else if (this.base instanceof Arcsine) {
                return this.base.latex.replace("\\arcsin", `\\arcsin^{${this.exponent.latex}}`);
            } else if (this.base instanceof Arccosine) {
                return this.base.latex.replace("\\arccos", `\\arccos^{${this.exponent.latex}}`);
            } else if (this.base instanceof Arctangent) {
                return this.base.latex.replace("\\arctan", `\\arctan^{${this.exponent.latex}}`);
            } 
        }

        return `\\left(${this.base.latex}\\right)^{${this.exponent.latex}}`;
    }
}