"use client"

import Function from "@/lib/symbo-diff/Function"
import parseLatex from "@/lib/symbo-diff/parseLatex";
import { useEffect, useState } from "react";
import AnswerField from "./AnswerField";
import Questions from "./Questions";
import { PlayableAudio, Scene } from "../../types";

type GameProps = {
    questions: Function[],
    gameMs: number,
    setGameMs: React.Dispatch<React.SetStateAction<number>>,
    setScene: React.Dispatch<React.SetStateAction<Scene>>,
    playAudio: React.Dispatch<React.SetStateAction<PlayableAudio | null>>
}

export default function Game({ questions, gameMs, setGameMs, setScene, playAudio }: GameProps) {
    const [currentAnswerLatex, setCurrentAnswerLatex] = useState("");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answersLatex, setAnswersLatex] = useState<string[]>([]);

    useEffect(() => {
        try {
            const answer = parseLatex(currentAnswerLatex);

            if (questions[currentQuestionIndex].derivative.equals(answer)) {
                // handle correct answer

                playAudio("correct");

                if (currentQuestionIndex + 1 === questions.length) {
                    // handle game end
                    setTimeout(() => {
                        setScene("postgame");
                    }, 500); 
                }

                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setAnswersLatex(prev => [...prev, currentAnswerLatex]);
                setCurrentAnswerLatex("");
            }
        } catch (err) {
            // console.log(err)
        }
    }, [currentAnswerLatex, setAnswersLatex, setCurrentQuestionIndex, playAudio]);

    useEffect(() => {
        const interval = setInterval(() => {
            setGameMs(prevGameMs => prevGameMs + 10);
        }, 10);

        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <Questions {...{questions, currentQuestionIndex, answersLatex}} />
            <AnswerField 
                {...{currentAnswerLatex, setCurrentAnswerLatex}}
            />
        </>
    )
}