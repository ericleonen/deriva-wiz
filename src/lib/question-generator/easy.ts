import Integer from "../symbo-diff/operands/Integer";
import Variable from "../symbo-diff/operands/Variable";
import Multiplication from "../symbo-diff/operators/basic/Multiplication";
import Exponentiation from "../symbo-diff/operators/exponential/Exponentiation";
import Function from "../symbo-diff/Function";
import { normal, uniform } from "./probability";
import Root from "../symbo-diff/operators/basic/Root";
import Division from "../symbo-diff/operators/basic/Division";
import Addition from "../symbo-diff/operators/basic/Addition";
import Subtraction from "../symbo-diff/operators/basic/Subtraction";
import Negation from "../symbo-diff/operators/basic/Negation";
import Logarithm from "../symbo-diff/operators/exponential/Logarithm";
import Sine from "../symbo-diff/operators/trigonometric/Sine";
import Cosine from "../symbo-diff/operators/trigonometric/Cosine";
import Tangent from "../symbo-diff/operators/trigonometric/Tangent";

/**
 * Returns an easy Function to take the derivative of in the form: af(bx+c)+d where f is x^n,
 * sqrt{x}, 1/x, e^x, ln(x), sin(x), cos(x), or tan(x). a, b, c, and d are Normal. a and b are
 * non-zero.
 */
export default function createEasyQuestion() {
    let a = Math.floor(normal(0, 2.5) + 0.5);
    if (a === 0) a = 1;
    const A = [-1, 1].includes(a) ? undefined : new Integer(Math.abs(a));

    let b = Math.floor(normal(0, 1.5) + 0.5);
    if (b === 0) b = 1;
    const B = [-1, 1].includes(b) ? undefined : new Integer(Math.abs(b));

    let c = Math.floor(normal(0, 1.5) + 0.5);
    const C = c === 0 ? undefined : new Integer(Math.abs(c));

    let d = Math.floor(normal(0, 1.5) + 0.5);
    const D = d === 0 ? undefined : new Integer(Math.abs(d));

    let X: Function = new Variable();
    X = B ? new Multiplication(B, X) : X;
    
    if (b > 0) {
        if (C) { // c !== 0
            if (c > 0) {
                X = new Addition(X, C);
            } else { // c < 0
                X = new Subtraction(X, C);
            }
        } else { // c === 0
            X = X;
        }
    } else { // b < 0
        if (c === 0 || c < 0) {
            X = new Negation(X);
            X = c === 0 ? X : new Subtraction(X, C!);
        } else { // c > 0
            X = new Subtraction(C!, X);
        }
    }

    let f: Function;
    switch (Math.floor(Math.random() * 8)) {
        case 0: // x^n
            let n = Math.floor(uniform(-9, 10));
            if (n === 0 || n === 1) n = 2;
            
            f = new Exponentiation(X, new Integer(n));
            break;
        case 1: // sqrt{x}
            f = new Root(X);
            break;
        case 2: // 1/x
            return A ? new Division(A, X) : new Division(new Integer(1), X);
        case 3: // e^x
            f = new Exponentiation(X);
            break;
        case 4: // ln(x)
            f = new Logarithm(X);
            break;
        case 5: // sin(x)
            f = new Sine(X);
            break;
        case 6: // cos(x)
            f = new Cosine(X);
            break;
        default: // tan(x)
            f = new Tangent(X);
            break;
    }

    f = A ? new Multiplication(A, f) : f;
    f = a < 0 ? new Negation(f) : f;
    
    if (D) {
        f = d > 0 ? new Addition(f, D) : new Subtraction(f, D);
    }

    return f;
}