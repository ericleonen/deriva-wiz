import { useEffect } from "react";
import { EditableMathField } from "react-mathquill"

type AnswerFieldProps = {
    currentAnswerLatex: string,
    setCurrentAnswerLatex: React.Dispatch<React.SetStateAction<string>>
}

const badChars ="wyudfghjkzvbm.,?\"';:|\\`~!@#$%&_=".split("");

export default function AnswerField({ currentAnswerLatex, setCurrentAnswerLatex }: AnswerFieldProps) {
    useEffect(() => {
        const preventInvalidLetters = (e: KeyboardEvent) => {
            if (badChars.includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
        }

        window.addEventListener("keydown", preventInvalidLetters);

        return () => window.removeEventListener("keydown", preventInvalidLetters);
    }, []);

    return (
        <div className="text-2xl min-h-[60px] min-w-64 brutal-box ring-transparent focus-within:ring-amber-300 ring-inset ring-2 bg-white">
            <EditableMathField
                className="px-2 py-4 min-h-[60px] min-w-64 !border-none !shadow-none"
                latex={currentAnswerLatex} 
                onChange={(mathField) => {
                    setCurrentAnswerLatex(mathField.latex())
                }}
                config={{
                    autoCommands: "pi sqrt"
                }}
                mathquillDidMount={mathField => mathField.focus()}
            />
        </div>
    )
}