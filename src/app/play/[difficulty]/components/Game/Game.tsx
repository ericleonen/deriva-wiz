"use client"

import Function from "@/lib/symbo-diff/Function"
import parseLatex from "@/lib/symbo-diff/parseLatex";
import React, { useEffect, useState } from "react";
import AnswerField from "./AnswerField";
import Questions from "./Questions";
import { PlayableAudio, Scene } from "../../types";
import Link from "next/link";

type GameProps = {
    questions: Function[],
    gameMs: number,
    setGameMs: React.Dispatch<React.SetStateAction<number>>,
    setScene: React.Dispatch<React.SetStateAction<Scene>>,
    playAudio: React.Dispatch<React.SetStateAction<PlayableAudio | null>>,
    skips: number,
    setSkips: React.Dispatch<React.SetStateAction<number>>
}

const smallButtonClassName = "font-bold h-12 w-16 rounded-sm border-2 border-black shadow flex items-center justify-center active:scale-95";

function formatGameMs(gameMs: number, skips: number): string {
    gameMs += 30 * 1000 * skips;
    const minutes = Math.floor(gameMs / (60 * 1000));
    const seconds = Math.floor((gameMs / 1000) % 60);
    const secondsStr = seconds.toString();

    return `${minutes}:${secondsStr.length === 1 ? "0" + secondsStr : secondsStr}`;
}

export default function Game({ questions, gameMs, setGameMs, setScene, playAudio, skips, setSkips }: GameProps) {
    const [currentAnswerLatex, setCurrentAnswerLatex] = useState("");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answersLatex, setAnswersLatex] = useState<string[]>([]);
    const [skipping, setSkipping] = useState(false);

    useEffect(() => {
        try {
            const answer = parseLatex(currentAnswerLatex);

            if (questions[currentQuestionIndex].derivative.equals(answer)) {
                // handle correct answer

                playAudio("correct");

                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setAnswersLatex(prev => [...prev, currentAnswerLatex]);
                setCurrentAnswerLatex("");
            }
        } catch (err) {
            console.log(currentAnswerLatex);
            console.log(err)
        }
    }, [currentAnswerLatex, setAnswersLatex, setCurrentQuestionIndex, playAudio]);

    useEffect(() => {
        if (currentQuestionIndex === questions.length) {
            // handle game end
            setTimeout(() => {
                setScene("postgame");
            }, 250); 
        }
    }, [currentQuestionIndex, setScene]);

    useEffect(() => {
        const interval = setInterval(() => {
            setGameMs(prevGameMs => prevGameMs + 10);
        }, 10);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!skipping) return;

        const timeout = setTimeout(() => {
            setSkipping(false);
        }, 300);

        return () => clearTimeout(timeout);
    }, [skipping, setSkipping]);

    return (
        <>
            <div className="z-20 absolute top-3 left-1/2 translate-x-[-50%] w-[30rem] flex">
                <Link 
                    href="/"
                    className={`bg-gray-200 hover:bg-gray-300 ${smallButtonClassName}`}
                >
                    Quit
                </Link>
                <p 
                    className="font-semibold text-xl transition-colors mx-3 h-12 flex-1 flex justify-center items-center bg-white border-2 shadow border-black rounded-sm"
                    style={ skipping ? {
                        color: "#ef4444",
                        fontWeight: "bold"
                    } : {}}
                >
                    {formatGameMs(gameMs, skips)}
                </p>
                <button
                    className={`bg-red-400 hover:bg-red-500 ${smallButtonClassName}`}
                    onClick={() => {
                        setCurrentQuestionIndex(prev => prev + 1);
                        setAnswersLatex(prev => [...prev, ""]);
                        setCurrentAnswerLatex("");
                        setSkipping(true);
                        setSkips(prev => Math.min(prev + 1, questions.length))
                        playAudio("skip");
                    }}
                >
                    Skip
                </button>
            </div>
            <Questions {...{questions, currentQuestionIndex, answersLatex}} />
            <AnswerField 
                {...{currentAnswerLatex, setCurrentAnswerLatex}}
            />
        </>
    )
}