import { Difficulty, Scene } from "../types"
import { difficultyColors } from "../uiConfig"
import { capitalize } from "../utils"

type PreGameProps = {
    difficulty: Difficulty,
    setScene: React.Dispatch<React.SetStateAction<Scene>>
}

export default function PreGame({ difficulty, setScene }: PreGameProps) {
    return (
        <div className="border-2 border-b-4 border-black flex flex-col w-[22rem] pb-3 rounded-md bg-white overflow-hidden">
            <p 
                className="w-full text-center p-2 font-bold text-xl border-b-2 border-black"
                style={{
                    backgroundColor: difficultyColors[difficulty]
                }}
            >
                {capitalize(difficulty)} Mode
            </p>
            <p className="p-3 font-medium text-lg">
                Solve the 20 derivatives as fast as you can.<br /><br />
                Enter your answers in the math input field just as you would type an expression into WebAssign or Desmos.
            </p>
            <button
                onClick={() => { setScene("countdown") }}
                className="w-[calc(100%-1.5rem)] mt-3 mx-auto border-2 border-b-4 border-black text-xl py-2 px-3 rounded-md font-bold hover:bg-amber-400 active:scale-90"
            >
                Begin
            </button>
        </div>
    )
}