import { useEffect } from "react";
import { StaticMathField, addStyles } from "react-mathquill";

type DerivativeRuleProps = {
    rule: {
        name: string,
        "function": string,
        derivative: string
    }
}

export default function DerivativeRule({ rule }: DerivativeRuleProps) {
    useEffect(() => {
        addStyles();
    }, []);

    return (
        <div className="flex items-center hover:bg-gray-200 p-3 rounded-sm" key={rule.name}>
            <span className="font-bold mr-1">{rule.name}:</span>
            <StaticMathField>{`\\frac{d}{dx}\\left(${rule["function"]}\\right)=${rule.derivative}`}</StaticMathField>
        </div>
    )
}