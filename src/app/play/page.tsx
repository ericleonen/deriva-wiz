"use client"

import { useEffect, useRef, useState } from "react"
import { addStyles } from "react-mathquill";
import Function from "@/lib/symbo-diff/Function";
import parseLatex from "@/lib/symbo-diff/parseLatex";
import QuestionGenerator from "@/lib/question-generator/QuestionGenerator";
import Questions from "./components/Questions";
import AnswerField from "./components/AnswerField";

if (window) addStyles();

const generator = new QuestionGenerator("easy");
const generatedQuestions = Array.from(Array(20)).map(() => generator.createQuestion());

export default function PlayPage() {
    const [currentAnswerLatex, setCurrentAnswerLatex] = useState("");
    const [questions, setQuestions] = useState<Function[]>(generatedQuestions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answersLatex, setAnswersLatex] = useState<string[]>([]);

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        try {
            const answer = parseLatex(currentAnswerLatex);

            if (questions[currentQuestionIndex].derivative.equals(answer)) {
                // handle correct answer
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setAnswersLatex(prev => [...prev, currentAnswerLatex]);
                setCurrentAnswerLatex("");

                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                }
            }
        } catch (err) {
            // console.log(err)
        }
    }, [currentAnswerLatex, setAnswersLatex, setCurrentQuestionIndex]);

    return (
        <div className="h-screen w-screen flex text-xl justify-center items-center">
            <audio ref={audioRef} hidden src="correct.wav" preload="auto"/>
            <Questions {...{questions, currentQuestionIndex, answersLatex}} />
            <AnswerField {...{currentAnswerLatex, setCurrentAnswerLatex}} />
        </div>
    )
}