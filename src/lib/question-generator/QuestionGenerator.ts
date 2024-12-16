import Variable from "../symbo-diff/operands/Variable";
import { choose, uniform } from "./probability";
import Function from "../symbo-diff/Function";
import Addition from "../symbo-diff/operators/basic/Addition";
import Subtraction from "../symbo-diff/operators/basic/Subtraction";
import Multiplication from "../symbo-diff/operators/basic/Multiplication";
import Division from "../symbo-diff/operators/basic/Division";
import Exponentiation from "../symbo-diff/operators/exponential/Exponentiation";
import Integer from "../symbo-diff/operands/Integer";
import Negation from "../symbo-diff/operators/basic/Negation";
import Root from "../symbo-diff/operators/basic/Root";
import Logarithm from "../symbo-diff/operators/exponential/Logarithm";
import Sine from "../symbo-diff/operators/trigonometric/Sine";
import Cosine from "../symbo-diff/operators/trigonometric/Cosine";
import Tangent from "../symbo-diff/operators/trigonometric/Tangent";
import Cosecant from "../symbo-diff/operators/trigonometric/Cosecant";
import Secant from "../symbo-diff/operators/trigonometric/Secant";
import Cotangent from "../symbo-diff/operators/trigonometric/Cotangent";
import Arcsine from "../symbo-diff/operators/trigonometric/Arcsine";
import Arccosine from "../symbo-diff/operators/trigonometric/Arccosine";
import Arctangent from "../symbo-diff/operators/trigonometric/Arctangent";
import { column, multiply } from "./utils";
import matrices from "./matrices/index.json";

/**
 * A question generator for all difficulties.
 */
export default class QuestionGenerator {
    /**
     * Original emitter matrix where the number in the ith row and jth column is the relative
     * likelihood of question node j having question node i as a child.
     */
    private readonly origEmitter: number[][];
    /**
     * Hidden matrix where the number in the ith row and the jth column is the factor to scale
     * all relative likelihoods in the ith row of the emitter after question node j.
     */
    private readonly hidden: number[][];

    /**
     * Initializes a question generator with the given difficulty.
     */
    public constructor(difficulty: string) {
        // @ts-ignore
        this.origEmitter = matrices[difficulty].emitter;
        // @ts-ignore
        this.hidden = matrices[difficulty].hidden;
    }

    public createQuestions(count: number): Function[] {
        const questions: Function[] = [];

        for (let i = 0; i < count; i++) {
            questions.push(this.createExpression().simplified);
        }

        return questions;
    }

    private createExpression(parentNodeIndex = 0, emitter = this.origEmitter): Function {
        const relativeLikelihoods = column(emitter, parentNodeIndex);
        let nodeIndex = choose(relativeLikelihoods);

        const relativeLikelihoodsFactors = column(this.hidden, nodeIndex);
        emitter = multiply(emitter, relativeLikelihoodsFactors);

        switch(nodeIndex) {
            case 0: // end x
                return new Variable();
            case 1: // binary addition f(x) + g(x)
                return new Addition(
                    this.createExpression(nodeIndex, emitter),
                    this.createExpression(nodeIndex, emitter)
                );
            case 2: // binary subtraction f(x) - g(x)
                const subtractionLeft = this.createExpression(nodeIndex, emitter);
                let subtractionRight: Function | null = null;

                while (!subtractionRight || subtractionLeft.equals(subtractionRight)) {
                    subtractionRight = this.createExpression(nodeIndex, emitter);
                }

                return new Subtraction(subtractionLeft, subtractionRight);
            case 3: // binary multiplication f(x)g(x)
                return new Multiplication(
                    this.createExpression(nodeIndex, emitter),
                    this.createExpression(nodeIndex, emitter)
                );
            case 4: // binary division f(x) / g(x)
                const divisionTop = this.createExpression(nodeIndex, emitter);
                let divisionBottom: Function | null = null;

                while (!divisionBottom || divisionTop.isProportionalTo(divisionBottom)) {
                    divisionBottom = this.createExpression(nodeIndex, emitter);
                }

                return new Division(divisionTop, divisionBottom);
            case 5: // binary exponentiation f(x)^g(x)
                return new Exponentiation(
                    this.createExpression(nodeIndex, emitter),
                    this.createExpression(nodeIndex, emitter)
                );
            case 6: // addition f(x) + r
                return new Addition(
                    this.createExpression(nodeIndex, emitter),
                    this.createInteger(1, 9)
                );
            case 7: // subtraction f(x) - r
                return new Subtraction(
                    this.createExpression(nodeIndex, emitter),
                    this.createInteger(1, 9)
                );
            case 8: // multiplication rf(x)
                return new Multiplication(
                    this.createInteger(2, 9),
                    this.createExpression(nodeIndex, emitter)
                );
            case 9: // division f(x) / r
                return new Division(
                    this.createExpression(nodeIndex, emitter),
                    this.createInteger(2, 9)
                );
            case 10: // negation -f(x)
                return new Negation(this.createExpression(nodeIndex, emitter));
            case 11: // square root sqrt(f(x))
                return new Root(this.createExpression(nodeIndex, emitter));
            case 12: // flip r / f(x)
                return new Division(
                    this.createInteger(1, 9),
                    this.createExpression(nodeIndex, emitter)
                )
            case 13: // natural exponentiation e^f(x)
                return new Exponentiation(this.createExpression(nodeIndex, emitter));
            case 14: // exponentiation r^f(x)
                return new Exponentiation(
                    this.createInteger(2, 9),
                    this.createExpression(nodeIndex, emitter)
                );
            case 15: // power f(x)^r
                return new Exponentiation(
                    this.createExpression(nodeIndex, emitter),
                    this.createInteger(2, 5, true)
                );
            case 16: // natural logarithm ln(f(x))
                return new Logarithm(this.createExpression(nodeIndex, emitter));
            case 17: // logarithm log_n(f(x))
                return new Logarithm(
                    this.createExpression(nodeIndex, emitter),
                    this.createInteger(2, 9)
                );
            case 18: // sine sin(f(x))
                return new Sine(this.createExpression(nodeIndex, emitter));
            case 19: // cosine cos(f(x))
                return new Cosine(this.createExpression(nodeIndex, emitter));
            case 20: // tangent tan(f(x))
                return new Tangent(this.createExpression(nodeIndex, emitter));
            case 21: // cosecant csc(f(x))
                return new Cosecant(this.createExpression(nodeIndex, emitter));
            case 22: // secant sec(f(x))
                return new Secant(this.createExpression(nodeIndex, emitter));
            case 23: // cotangent cot(f(x))
                return new Cotangent(this.createExpression(nodeIndex, emitter));
            case 24: // arcsine arcsin(f(x))
                return new Arcsine(this.createExpression(nodeIndex, emitter));
            case 25: // arccosine arccos(f(x))
                return new Arccosine(this.createExpression(nodeIndex, emitter));
            case 26: // arctangent arctan(f(x))
                return new Arctangent(this.createExpression(nodeIndex, emitter));
            default:
                throw new Error();
        }
    }

    public createInteger(min: number, max: number, includeNegatives = false): Integer {
        if (min < 1 || max <= min)
            throw new Error("min must be positive and max must be greater than min.");

        const sign = includeNegatives && uniform() < 0.33 ? -1 : 1;

        return new Integer(sign * Math.floor(uniform(min, max + 1)));
    }
}