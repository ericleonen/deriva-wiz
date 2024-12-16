import { useEffect, useRef } from "react"
import { Difficulty, PlayableAudio, Scene } from "../types"
import { difficultyColors } from "../uiConfig";
import Link from "next/link";
import { capitalize } from "../utils";

type PostGameProps = {
    gameMs: number,
    playAudio: React.Dispatch<React.SetStateAction<PlayableAudio | null>>,
    difficulty: Difficulty,
    setScene: React.Dispatch<React.SetStateAction<Scene>>
}

function formatGameMs(gameMs: number): string {
    const minutes = Math.floor(gameMs / (60 * 1000));
    const seconds = Math.floor((gameMs / 1000) % 60);

    if (minutes) {
        const secondsStr = seconds.toString();

        return `${minutes}:${secondsStr.length === 1 ? "0" + secondsStr : secondsStr}`;
    } else {
        return `${seconds} seconds`;
    }
}

export default function PostGame({ gameMs, playAudio, difficulty, setScene }: PostGameProps) {
    useEffect(() => {
        playAudio("gameover");
    }, [playAudio]);

    return (
        <>
            <div className="border-2 border-b-4 border-black flex flex-col w-[20rem] pb-3 rounded-md bg-white overflow-hidden">
                <p
                    className="w-full text-center p-2 font-bold text-xl border-b-2 border-black"
                    style={{
                        backgroundColor: difficultyColors[difficulty]
                    }}
                >
                    {capitalize(difficulty)} mode complete!
                </p>
                <p className="p-3 font-medium text-center text-lg">
                    You solved 20 derivatives with a time of{" "}
                    <span className="font-bold">{formatGameMs(gameMs)}</span>.
                </p>
                <div className="flex justify-around mr-3 mt-3">
                    <button
                        onClick={() => setScene("pregame")}
                        className="ml-3 flex-1 border-2 border-b-4 border-black text-xl py-2 px-3 rounded-md font-bold hover:bg-amber-400 active:scale-90"
                    >
                        Play again
                    </button>
                    <Link 
                        href="/"
                        className="text-center ml-3 flex-1 border-2 border-b-4 border-black text-xl py-2 px-3 rounded-md font-bold hover:bg-amber-400 active:scale-90"
                    >
                        Go home
                    </Link>
                </div>
            </div>
        </>
    )
}