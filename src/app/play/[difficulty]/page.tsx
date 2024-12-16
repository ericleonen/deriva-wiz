"use client"

import QuestionGenerator from "@/lib/question-generator/QuestionGenerator";
import Game from "./components/Game";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Function from "@/lib/symbo-diff/Function";
import { Difficulty, PlayableAudio, Scene } from "./types";
import PreGame from "./components/PreGame";
import Countdown from "./components/Countdown";
import { addStyles } from "react-mathquill";
import PostGame from "./components/PostGame";
import Audio from "./components/Audio";

if (window) addStyles();

export default function PlayPage() {
    const { difficulty } = useParams<{ difficulty: Difficulty }>();
    const [questions, setQuestions] = useState<Function[]>([]);
    const [scene, setScene] = useState<Scene>("pregame");
    const [gameMs, setGameMs] = useState<number>(0);
    const [currentAudio, playAudio] = useState<PlayableAudio | null>(null);

    useEffect(() => {
        if (scene === "pregame" && difficulty && (questions.length === 0 || gameMs > 0)) {
            const generator = new QuestionGenerator(difficulty);
            setQuestions(generator.createQuestions(20));
            setGameMs(0);
        }
    }, [scene, difficulty, questions, setQuestions, gameMs]);

    let currentScene: React.ReactNode;

    switch(scene) {
        case "pregame":
            currentScene = <PreGame {...{difficulty, setScene}} />;
            break;
        case "countdown":
            currentScene = <Countdown {...{setScene, playAudio}} />;
            break;
        case "game":
            currentScene = <Game {...{questions, gameMs, setGameMs, setScene, playAudio}} />;
            break
        default: // case "postgame"
            currentScene = <PostGame {...{gameMs, playAudio, difficulty, setScene}} />;
    }

    return (
        <>
            <Audio currentAudio={currentAudio} setCurrentAudio={playAudio} />
            {currentScene}
        </>
    )
}