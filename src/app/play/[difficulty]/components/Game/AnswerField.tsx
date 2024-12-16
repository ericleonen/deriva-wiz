import { EditableMathField } from "react-mathquill"

type AnswerFieldProps = {
    currentAnswerLatex: string,
    setCurrentAnswerLatex: React.Dispatch<React.SetStateAction<string>>
}

export default function AnswerField({ currentAnswerLatex, setCurrentAnswerLatex }: AnswerFieldProps) {
    return (
        <div className="text-2xl min-h-[60px] min-w-[300px] border-2 border-b-4 border-black rounded-md focus-within:ring-2 ring-amber-400 bg-white">
            <EditableMathField
                className="px-2 py-4 min-h-[60px] min-w-[300px] !border-none !shadow-none"
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