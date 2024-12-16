import { useEffect, useState } from "react"
import { PlayableAudio, Scene } from "../types"

type CountdownProps = {
    setScene: React.Dispatch<React.SetStateAction<Scene>>,
    playAudio: React.Dispatch<React.SetStateAction<PlayableAudio | null>>
}

export default function Countdown({ setScene, playAudio }: CountdownProps) {
    const [value, setValue] = useState(3);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (value === 0) {
                setScene("game");
            } else {
                setValue(prevValue => prevValue - 1);
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [value, setValue]);

    useEffect(() => {

        if (value > 0) {
            playAudio("countdown1");
        } else {
            playAudio("countdown2");
        }
    }, [value, playAudio]);

    return value > 0 ? (
        <div className="bg-white h-[10rem] aspect-square rounded-full border-4 border-black flex items-center justify-center text-6xl font-bold">
            {value}
        </div>
    ) : null;
}