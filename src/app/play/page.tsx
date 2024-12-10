"use client"

import { useEffect, useRef, useState } from "react"
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
import Function from "@/lib/symbo-diff/Function";
import parseLatex from "@/lib/symbo-diff/parseLatex";
import QuestionGenerator from "@/lib/question-generator/QuestionGenerator";

if (window) addStyles();

const generator = new QuestionGenerator("easy");

export default function PlayPage() {
    const [latex, setLatex] = useState("");
    const [questions, setQuestions] = useState<Function[]>(Array.from(Array(10)).map(() => generator.createQuestion()));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        try {
            const answer = parseLatex(latex);

            if (questions[currentQuestionIndex].derivative.equals(answer)) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setLatex("");
            } else {
                console.log("Correct Answer");
                console.log(questions[currentQuestionIndex].derivative);
                console.log("Your Answer");
                console.log(answer);
            }
        } catch (err) {
            // console.log(err);
        }
    }, [latex]);

    return (
        <div className="h-screen w-screen flex text-xl justify-center items-center">
            <div 
                className="flex flex-col-reverse items-end transition-transform"
                style={{
                    transform: `translateY(calc(${30 + (currentQuestionIndex * 60)}px - 50%))` 
                }}
            >
                {
                    questions.map((question: Function, questionIndex: number) => (
                        <StaticMathField 
                            key={`question_${questionIndex}`}
                            className="h-[60px] py-1 px-2 flex justify-center items-center"
                        >
                            {`\\frac{d}{dx}\\left(${question.latex}\\right)=`}
                        </StaticMathField>
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