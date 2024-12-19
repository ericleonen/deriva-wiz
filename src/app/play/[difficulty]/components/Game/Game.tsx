"use client"

import Function from "@/lib/symbo-diff/Function"
import parseLatex from "@/lib/symbo-diff/parseLatex";
import React, { useEffect, useState } from "react";
import AnswerField from "./AnswerField";
import Questions from "./Questions";
import { PlayableAudio, Scene } from "../../types";
import TinyButton from "@/app/components/Header/TinyButton";
import Header from "@/app/components/Header";
import HeaderLabel from "@/app/components/Header/HeaderLabel";
import { addStyles } from "react-mathquill";

type GameProps = {
    questions: Function[],
    gameMs: number,
    setGameMs: React.Dispatch<React.SetStateAction<number>>,
    setScene: React.Dispatch<React.SetStateAction<Scene>>,
    playAudio: React.Dispatch<React.SetStateAction<PlayableAudio | null>>,
    skips: number,
    setSkips: React.Dispatch<React.SetStateAction<number>>
}

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
        addStyles();
    }, []);

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
        } catch {
            return;
            // console.log(currentAnswerLatex);
            // console.log(err)
        }
    }, [currentAnswerLatex, setAnswersLatex, setCurrentQuestionIndex, playAudio, currentQuestionIndex, questions]);

    useEffect(() => {
        if (currentQuestionIndex === questions.length) {
            // handle game end
            setTimeout(() => {
                setScene("postgame");
            }, 250); 
        }
    }, [currentQuestionIndex, setScene, questions.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setGameMs(prevGameMs => prevGameMs + 10);
        }, 10);

        return () => clearInterval(interval);
    }, [setGameMs]);

    useEffect(() => {
        if (!skipping) return;

        const timeout = setTimeout(() => {
            setSkipping(false);
        }, 300);

        return () => clearTimeout(timeout);
    }, [skipping, setSkipping]);

    return (
        <>
            <Header className="z-20 absolute top-3 left-1/2 translate-x-[-50%] !w-[30rem]">
                <TinyButton
                    label="Quit"
                    href="/"
                />
                <HeaderLabel 
                    label={formatGameMs(gameMs, skips)}
                    className={`transition-colors ${skipping ? "!bg-hard" : ""}`}
                />
                <TinyButton 
                    label="Skip"
                    onClick={() => {
                        setCurrentQuestionIndex(prev => prev + 1);
                        setAnswersLatex(prev => [...prev, ""]);
                        setCurrentAnswerLatex("");
                        setSkipping(true);
                        setSkips(prev => Math.min(prev + 1, questions.length))
                        playAudio("skip");
                    }}
                    difficulty="hard"
                />
            </Header>
            <Questions {...{questions, currentQuestionIndex, answersLatex}} />
            <AnswerField 
                {...{currentAnswerLatex, setCurrentAnswerLatex}}
            />
        </>
    )
}