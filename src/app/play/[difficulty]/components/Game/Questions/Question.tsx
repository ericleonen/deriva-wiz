import Function from "@/lib/symbo-diff/Function"
import Image from "next/image"
import { StaticMathField } from "react-mathquill"

type QuestionProps = {
    question: Function,
    questionIndexDist: number,
    answerLatex?: string
}

export default function Question({ question, questionIndexDist, answerLatex }: QuestionProps) {
    return (
        <div
            className="h-[100px] flex justify-center items-center relative"
            style={{
                opacity: Math.pow(0.4, questionIndexDist)
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
                        <Image 
                            src="/checkmark.png" 
                            className="ml-2" 
                            alt="checkmark"
                            height={32}
                            width={32}
                            priority
                        />
                    </div>
                )
            }
        </div>
    )
}