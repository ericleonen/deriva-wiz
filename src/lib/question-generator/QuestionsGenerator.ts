import Function from "../symbo-diff/Function";
import Integer from "../symbo-diff/operands/Integer";
import Variable from "../symbo-diff/operands/Variable";
import Addition from "../symbo-diff/operators/basic/Addition";
import Division from "../symbo-diff/operators/basic/Division";
import Multiplication from "../symbo-diff/operators/basic/Multiplication";
import Negation from "../symbo-diff/operators/basic/Negation";
import Subtraction from "../symbo-diff/operators/basic/Subtraction";
import { choose, uniform, uniformInt } from "./probability";
import { CombinationConfig, Difficulty, FunctionGroup, IntConfig, LinearConfig, FunctionConfig } from "./types";
import Root from "../symbo-diff/operators/basic/Root";
import Exponentiation from "../symbo-diff/operators/exponential/Exponentiation";
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
import prevent from "./prevent.json";
import generate from "./generate.json";

export default class QuestionGenerator {
    private readonly difficulty: Difficulty;
    
    public constructor(difficulty: Difficulty) {
        this.difficulty = difficulty;
    }

    public createQuestions(count: number): Function[] {
        const questions: Function[] = [];

        const createQuestion = {
            "easy": () => this.createEasyQuestion(),
            "intermediate": () => this.createIntermediateQuestion(),
            "hard": () => this.createHardQuestion()
        }[this.difficulty];

        for (let i = 0; i < count; i++) {
            questions.push(createQuestion().simplified);
        }

        return questions;
    }

    private createEasyQuestion(extraFunctionGroups: FunctionGroup[] = []): Function {
        let x: Function = new Variable();

        if (uniform() < generate.questions.easierQuestion) {
            // @ts-ignore
            return this.createLinearExpression(x, generate.linear.preset.outer);
        }

        x = this.createLinearExpression(x, generate.linear.preset.inner.heavy);

        x = this.createFunctionExpression(x, {
            groups: [
                // @ts-ignore
                ...generate.questions.functionGroups.easy,
                ...extraFunctionGroups
            ],
            prevent: x.hasFraction ? ["flip"] : undefined
        }).expression;

        return this.createLinearExpression(x, generate.linear.preset.outer);
    }

    private createIntermediateQuestion(): Function {
        if (uniform() < generate.questions.easierQuestion) {
            return this.createEasyQuestion(
                generate.questions.functionGroups.intermediate.easier
            );
        }

        let x: Function = new Variable();

        x = this.createCombinationExpression(
            this.createLinearExpression(x, generate.linear.preset.inner.light),
            this.createLinearExpression(x, generate.linear.preset.inner.light),
            {
                groups: generate.questions.functionGroups.intermediate.combination,
                // @ts-ignore
                typesRelativeLikelihoods: generate.questions.combinationRelativeLikelihoods.intermediate
            }
        )
        
        return this.createLinearExpression(x, generate.linear.preset.outer);
    }

    private createHardQuestion(): Function {
        if (uniform() < generate.questions.easierQuestion) {
            // @ts-ignore
            return this.createEasyQuestion([
                ...generate.questions.functionGroups.hard.easier
            ]);
        }

        let x: Function = new Variable();

        x = this.createCombinationExpression(
            this.createLinearExpression(x, generate.linear.preset.inner.light),
            this.createLinearExpression(x, generate.linear.preset.inner.light),
            {
                // @ts-ignore
                groups: generate.questions.functionGroups.hard.combination,
                // @ts-ignore
                typesRelativeLikelihoods: generate.questions.combinationRelativeLikelihoods.hard
            }
        )
        
        return this.createLinearExpression(x, generate.linear.preset.outer);
    }

    /**
     * Given a Function x, applies a linear function and returns a Function in the form of
     * (+/-)A*x +/- B.
     */
    private createLinearExpression(x: Function, config: LinearConfig): Function {
        const factorSign = uniform() < config.negFactor ? -1 : 1;

        let mulFactor = 
            uniform() < config.mulFactor && (
                !(x instanceof Division) &&
                !(x instanceof Exponentiation && !x.base) &&
                !(x instanceof Addition) &&
                !(x instanceof Subtraction)
            ) ? this.createInt({
                // @ts-ignore
                magRange: generate.linear.range.mulDiv,
                neg: 0,
            }) : null;
        let divFactor = 
            uniform() < config.divFactor && !(x.hasFraction)
            ? this.createInt({
                // @ts-ignore
                magRange: generate.linear.range.mulDiv,
                neg: 0,
                prevent: mulFactor ? [(mulFactor as Integer).value] : undefined
            }): null;
        
        if (mulFactor && divFactor) {
            mulFactor = new Division(mulFactor, divFactor);
            divFactor = null;
        }

        if (mulFactor) {
            x = new Multiplication(mulFactor, x);
        } else if (divFactor) {
            x = new Division(x, divFactor);
        }

        if (factorSign === -1) x = new Negation(x);

        const constant = uniform() < config.constant && (
            !(x instanceof Addition) &&
            !(x instanceof Subtraction)
        ) ? this.createInt({
            // @ts-ignore
            magRange: generate.linear.range.addSub,
            neg: 0
        }) : null;

        if (constant) {
            if (uniform() < config.negativeConstant) {
                x = new Addition(x, constant);
            } else { // constantSign === -1
                x = new Subtraction(x, constant);
            }
        }

        return x;
    }

    private createFunctionExpression(x: Function, config: FunctionConfig): {
        expression: Function,
        functionCode: string
    } {
        if (x.hasFraction) {
            config.prevent = [
                // @ts-ignore
                ...(prevent.combination?.chain.innerFraction || []),
                ...(config.prevent || [])
            ];
        }

        config.groups = config.groups.map(group => ({
            ...group,
            functions: group.functions.filter(f => !config.prevent?.includes(f))
        })).filter(group => group.functions.length > 0);

        const selectedGroupIndex = choose(config.groups.map(group => group.relativeLikelihood));
        const selectedGroup = config.groups[selectedGroupIndex].functions;

        const functionCode = selectedGroup[uniformInt(0, selectedGroup.length - 1)];

        let expression: Function;

        switch (functionCode) {
            case "id":
                expression = x;
                break;
            case "sqrt":
                expression = new Root(x);
                break;
            case "flip":
                const flipConstant = this.createInt({ magRange: [1, 9], neg: 0 });
                expression = new Division(flipConstant, x);
                break;
            case "nat_exp":
                expression =  new Exponentiation(x);
                break;
            case "exp":
                const expConstant = this.createInt({ magRange: [2, 9], neg: 0 });
                expression = new Exponentiation(expConstant, x);
                break;
            case "pow":
                const powConstant = this.createInt({ magRange: [2, 9], neg: 0.05 });
                expression = new Exponentiation(x, powConstant);
                break;
            case "nat_log":
                expression = new Logarithm(x);
                break;
            case "log":
                const logConstant = this.createInt({ magRange: [2, 9], neg: 0 })
                expression = new Logarithm(x, logConstant as Integer);
                break;
            case "sin":
                expression = new Sine(x);
                break;
            case "cos":
                expression = new Cosine(x);
                break;
            case "tan":
                expression = new Tangent(x);
                break;
            case "csc":
                expression = new Cosecant(x);
                break;
            case "sec":
                expression = new Secant(x);
                break;
            case "cot":
                expression = new Cotangent(x);
                break;
            case "arcsin":
                expression = new Arcsine(x);
                break;
            case "arccos":
                expression = new Arccosine(x);
                break;
            case "arctan":
                expression = new Arctangent(x);
                break;
            default:
                throw new Error("Unknown function code selected: " + functionCode);
        }

        return { expression, functionCode };
    }

    private createCombinationExpression(x1: Function, x2: Function, config: CombinationConfig): Function {
        if (x1.hasFraction || x2.hasFraction) {
            config.typesRelativeLikelihoods = [...config.typesRelativeLikelihoods];
            config.typesRelativeLikelihoods[3] = 0;
            config.typesRelativeLikelihoods[4] = 0;
        }

        const typeIndex = choose(config.typesRelativeLikelihoods);
        const groups = config.groups;

        if (typeIndex === 0) { // chain f(g(x))
            const { expression: g, functionCode: gCode } = this.createFunctionExpression(x1, { groups });
            const { expression: f } = this.createFunctionExpression(g, {
                groups,
                prevent: [
                    // @ts-ignore
                    ...(prevent.combination.betweenFunction[gCode]?.chain || []), 
                    // @ts-ignore
                    ...((g.hasFraction && prevent.combination?.chain.innerFraction) || [])
                ]
            });

            return f;
        } else if (typeIndex === 1 || typeIndex === 2) { // f(x) +/- g(x)
            const { expression: f, functionCode: fCode } = this.createFunctionExpression(x1, { groups });
            const { expression: g } = this.createFunctionExpression(x2, { 
                groups, 
                prevent: [fCode]
            });

            return typeIndex === 1 ? new Addition(f, g) : new Subtraction(f, g);
        } else { // f(x) */÷ g(x)
            const { expression: f, functionCode: fCode } = this.createFunctionExpression(x1, {
                groups,
                // @ts-ignore
                prevent: prevent.combination?.mulDiv || []
            });
            const { expression: g } = this.createFunctionExpression(x2, {
                groups,
                prevent: [
                    // @ts-ignore
                    ...(prevent.combination.betweenFunction[fCode]?.mulDiv || []),
                    // @ts-ignore 
                    ...(prevent.combination?.mulDiv || []),
                    fCode
                ]
            });

            return typeIndex === 3 ? new Multiplication(f, g) : new Division(f, g);
        }
    }

    /**
     * Returns an Integer with a magnitude in the given range. This Integer will be negative with
     * the given "neg" probability.
     */
    private createInt(config: IntConfig): Function {
        let val = uniformInt(...config.magRange);
        while (config.prevent && config.prevent.includes(val)) {
            val++;

            if (val > config.magRange[1]) {
                val = config.magRange[0]
            }
        }
        const int = new Integer(val);

        return uniform() < config.neg ? new Negation(int) : int;
    }
}