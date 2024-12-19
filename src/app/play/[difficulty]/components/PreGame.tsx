import { BookOpenIcon, HomeIcon } from "@heroicons/react/16/solid"
import { Difficulty, Scene } from "../types"
import { capitalize } from "../utils"
import Link from "next/link"
import { StaticMathField } from "react-mathquill"
import TinyButton from "@/app/components/Header/TinyButton"
import Header from "@/app/components/Header"
import HeaderLabel from "@/app/components/Header/HeaderLabel"
import Content from "@/app/components/Content"

type PreGameProps = {
    difficulty: Difficulty,
    setScene: React.Dispatch<React.SetStateAction<Scene>>
}

const linkClassName = "text-blue-500 hover:text-blue-600 underline"

export default function PreGame({ difficulty, setScene }: PreGameProps) {
    return (
        <div className="w-[30rem] flex-col">
            <Header className="mb-3">
                <TinyButton 
                    Icon={HomeIcon}
                    href="/"
                    difficulty={difficulty}
                    title="Home"
                />
                <HeaderLabel 
                    label={capitalize(difficulty) + " Mode"}
                    difficulty={difficulty}
                />
                <TinyButton 
                    Icon={BookOpenIcon}
                    href={"/cheatsheet#" + difficulty}
                    difficulty={difficulty}
                    title={`${capitalize(difficulty)} Derivative Cheatsheet`}
                />
            </Header>
            <Content className="!p-6">
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
            </Content>
        </div>
    )
}