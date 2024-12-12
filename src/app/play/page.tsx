"use client"

import { useEffect, useState } from "react"
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
import Function from "@/lib/symbo-diff/Function";
import parseLatex from "@/lib/symbo-diff/parseLatex";
import QuestionGenerator from "@/lib/question-generator/QuestionGenerator";

if (window) addStyles();

const generator = new QuestionGenerator("medium");
const generatedQuestions = Array.from(Array(20)).map(() => generator.createQuestion());

export default function PlayPage() {
    const [latex, setLatex] = useState("");
    const [questions, setQuestions] = useState<Function[]>(generatedQuestions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        try {
            const answer = parseLatex(latex);

            if (questions[currentQuestionIndex].derivative.equals(answer)) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setLatex("");
            }
        } catch (err) {
            // console.log(err)
        }
    }, [latex]);

    return (
        <div className="h-screen w-screen flex text-xl justify-center items-center">
            <div 
                className="flex flex-col-reverse items-end transition-transform"
                style={{
                    transform: `translateY(calc(${50 + 100*currentQuestionIndex}px - 50%))` 
                }}
            >
                {
                    questions.map((question: Function, questionIndex: number) => (
                        <div 
                            key={`question_${questionIndex}`}
                            className="h-[100px] flex justify-center items-center"
                        >
                            <StaticMathField>
                                {`\\frac{d}{dx}\\left(${question.latex}\\right)=`}
                            </StaticMathField>
                        </div>
                    ))
                }
            </div>
            <EditableMathField 
                className="min-h-[60px] p-4 min-w-[300px]"
                latex={latex} 
                onChange={(mathField) => {
                    setLatex(mathField.latex())
                }}
                config={{
                    autoCommands: "pi sqrt"
                }}
            />
        </div>
    )
}