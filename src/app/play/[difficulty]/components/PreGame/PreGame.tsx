import { BookOpenIcon, HomeIcon } from "@heroicons/react/16/solid"
import { Difficulty, Scene } from "../../types"
import { capitalize } from "@/app/utils"
import { addStyles, StaticMathField } from "react-mathquill"
import TinyButton from "@/app/components/Header/TinyButton"
import Header from "@/app/components/Header"
import HeaderLabel from "@/app/components/Header/HeaderLabel"
import Content from "@/app/components/Content"
import BeginButton from "./BeginButton"
import ExternalLink from "./ExternalLink"
import { useEffect } from "react"

type PreGameProps = {
    difficulty: Difficulty,
    setScene: React.Dispatch<React.SetStateAction<Scene>>
}

export default function PreGame({ difficulty, setScene }: PreGameProps) {
    useEffect(() => {
        addStyles();
    }, []);

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
                    <ExternalLink 
                        label="WebAssign"
                        href="https://www.webassign.net/" 
                    />{" "}
                    or{" "}
                    <ExternalLink
                        label="Desmos"
                        href="https://www.desmos.com/calculator"
                    />.{" "}
                    If you&apos;ve never heard of either, you might want to play around with{" "}
                    <ExternalLink 
                        label="MathQuill" 
                        href="http://mathquill.com/"
                    />.<br /><br />
                    <span className="font-semibold">Note:</span> You can type a <StaticMathField>{"\\sqrt{}"}</StaticMathField> symbol by typing <code>sqrt</code>.
                </p>
                <BeginButton onClick={() => { setScene("countdown") }} />
            </Content>
        </div>
    )
}