import { BookOpenIcon, HomeIcon } from "@heroicons/react/16/solid"
import { Difficulty, Scene } from "../types"
import { difficultyColors } from "../uiConfig"
import { capitalize } from "../utils"
import Link from "next/link"
import { StaticMathField } from "react-mathquill"

type PreGameProps = {
    difficulty: Difficulty,
    setScene: React.Dispatch<React.SetStateAction<Scene>>
}

const smallButtonClassName = "h-12 w-12 rounded-sm bg-white border-2 border-black shadow flex items-center justify-center hover:!bg-amber-300 active:scale-95 active:!bg-amber-300";
const linkClassName = "text-blue-500 hover:text-blue-600 underline"

export default function PreGame({ difficulty, setScene }: PreGameProps) {
    return (
        <div className="w-[30rem] flex-col">
            <div className="flex">
                <Link 
                    href="/"
                    className={smallButtonClassName}
                    style={{
                        backgroundColor: difficultyColors[difficulty]
                    }}
                    title="Home"
                >
                    <HomeIcon className="h-6 w-6" />
                </Link>
                <h1 
                    className="mx-3 h-12 flex flex-1 justify-center items-center font-bold text-xl shadow border-2 border-black rounded-sm"
                    style={{
                        backgroundColor: difficultyColors[difficulty]
                    }}
                >
                    {capitalize(difficulty)} Mode
                </h1>
                <Link
                    href={"/cheatsheet#" + difficulty}
                    className={smallButtonClassName}
                    style={{
                        backgroundColor: difficultyColors[difficulty]
                    }}
                    title={`${capitalize(difficulty)} Derivative Cheatsheet`}
                >
                    <BookOpenIcon className="h-6 w-6" />
                </Link>
            </div>
            <div className="mt-3 border-2 shadow border-black flex flex-col w-full p-6 rounded-sm bg-white">
                <p className="font-medium text-lg">
                    Solve the 20 derivatives as fast as you can.<br /><br />
                    Enter your answers in the math input field just as you would type an expression into{" "}
                    <Link className={linkClassName} href="https://www.webassign.net/">WebAssign</Link>{" "}
                    or <Link className={linkClassName} href="https://www.desmos.com/calculator">Desmos</Link>.{" "}
                    If you&apos;ve never heard of either, you might want to play around with{" "}
                    <Link className={linkClassName} href="http://mathquill.com/">Mathquill</Link>.<br /><br />
                    <span className="font-semibold">Note:</span> You can type a <StaticMathField>{"\\sqrt{}"}</StaticMathField> symbol by typing <code>sqrt</code>.
                </p>
                <button
                    onClick={() => { setScene("countdown") }}
                    className="w-full mt-6 border-2 shadow-sm border-black text-xl py-2 px-3 rounded-sm font-bold hover:bg-amber-300 active:scale-90"
                >
                    Begin
                </button>
            </div>
        </div>
    )
}