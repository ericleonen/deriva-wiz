import React, { useEffect, useRef } from "react"
import { PlayableAudio } from "../types";

type AudioProps = {
    currentAudio: PlayableAudio | null,
    setCurrentAudio: React.Dispatch<React.SetStateAction<PlayableAudio | null>>
}

function playAudio(playerRef: React.RefObject<HTMLAudioElement>): void {
    const player = playerRef.current

    if (player) {
        player.currentTime = 0;
        player.play();
    }
}

export default function Audio({ currentAudio, setCurrentAudio }: AudioProps) {
    const countdown1Ref = useRef<HTMLAudioElement>(null);
    const countdown2Ref = useRef<HTMLAudioElement>(null);
    const correctRef = useRef<HTMLAudioElement>(null);
    const gameoverRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!currentAudio) return;

        switch(currentAudio) {
            case "countdown1":
                playAudio(countdown1Ref);
                break;
            case "countdown2":
                playAudio(countdown2Ref);
                break;
            case "correct":
                playAudio(correctRef);
                break;
            default: // case "gameover"
                playAudio(gameoverRef);

        }

        setCurrentAudio(null);
        
    }, [currentAudio]);

    return (
        <>
            <audio ref={countdown1Ref} hidden src="/countdown_pt1.wav" preload="auto"/>
            <audio ref={countdown2Ref} hidden src="/countdown_pt2.wav" preload="auto"/>
            <audio ref={correctRef} hidden src="/correct.wav" preload="auto"/>
            <audio ref={gameoverRef} hidden src="/gameover.wav" preload="auto"/>
        </>
    )
}