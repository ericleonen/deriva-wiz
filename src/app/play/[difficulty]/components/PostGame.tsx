import { useEffect } from "react"
import { Difficulty, PlayableAudio, Scene } from "../types"
import { difficultyColors } from "../uiConfig";
import { capitalize } from "../utils";
import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/16/solid";
import TinyButton from "@/app/components/Header/TinyButton";

type PostGameProps = {
    gameMs: number,
    playAudio: React.Dispatch<React.SetStateAction<PlayableAudio | null>>,
    difficulty: Difficulty,
    setScene: React.Dispatch<React.SetStateAction<Scene>>,
    skips: number
}

function formatGameMs(gameMs: number): string {
    const minutes = Math.floor(gameMs / (60 * 1000));
    const sec = Math.floor((gameMs / 1000) % 60);

    if (minutes) {
        const secStr = sec.toString();

        return `${minutes}:${secStr.length === 1 ? "0" + secStr : secStr}`;
    } else {
        return `${sec} sec`;
    }
}

export default function PostGame({ gameMs, playAudio, difficulty, setScene, skips }: PostGameProps) {
    useEffect(() => {
        playAudio("gameover");
    }, [playAudio]);

    return (
        <div className="flex flex-col w-[30rem]">
            <div className="flex">
                <TinyButton 
                    Icon={HomeIcon}
                    href="/"
                    difficulty={difficulty}
                    title="Home"
                />
                <h1
                    className="w-full h-12 flex-1 mx-3 flex items-center justify-center font-bold text-xl border-2 shadow border-black"
                    style={{
                        backgroundColor: difficultyColors[difficulty]
                    }}
                >
                    {capitalize(difficulty)} Mode Done!
                </h1>
                <TinyButton
                    Icon={ArrowUturnLeftIcon}
                    onClick={() => setScene("pregame")}
                    difficulty={difficulty}
                    title="Play again"
                />
            </div>
            <div className="mt-3 border-2 shadow border-black flex flex-col w-full p-6 rounded-sm bg-white overflow-hidden">
                <p className="font-medium text-lg">
                    You solved{" "}
                    <span className="font-semibold">{20 - skips} out of 20</span>{" "}
                    derivatives in {formatGameMs(gameMs)}.{" "}
                    {
                        skips > 0 ? <>
                            You had a penalty of {skips} skips × 30 sec ={" "}
                            <span className="font-semibold text-red-500">{30 * skips} sec</span>.
                        </> : ""
                    }
                </p>
                <p className="font-bold mt-3 text-xl text-center">Total time: {formatGameMs(gameMs + 30 * 1000 * skips)}</p>
            </div>
        </div>
    )
}