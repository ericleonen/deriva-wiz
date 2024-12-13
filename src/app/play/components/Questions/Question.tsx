import Function from "@/lib/symbo-diff/Function"
import { StaticMathField } from "react-mathquill"

type QuestionProps = {
    question: Function,
    questionIndexDist: number,
    answerLatex?: string
}

export default function Question({ question, questionIndexDist, answerLatex }: QuestionProps) {
    return (
        <div
            className="h-[100px] flex justif-center items-center relative"
            style={{
                opacity: Math.pow(0.5, questionIndexDist)
            }}
        >
            <StaticMathField>
                {`\\frac{d}{dx}\\left(${question.latex}\\right)=`}
            </StaticMathField>
            {
                // correctly answered question
                answerLatex && (
                    <div className="absolute left-full top-1/2 translate-y-[-50%] flex items-center">
                        <StaticMathField>
                            {answerLatex}
                        </StaticMathField>
                        <img src="checkmark.png" className="h-[32px] ml-2"/>
                    </div>
                )
            }
        </div>
    )
}