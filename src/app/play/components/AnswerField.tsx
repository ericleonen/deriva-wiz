import { EditableMathField } from "react-mathquill"

type AnswerFieldProps = {
    currentAnswerLatex: string,
    setCurrentAnswerLatex: React.Dispatch<React.SetStateAction<string>>
}

export default function AnswerField({ currentAnswerLatex, setCurrentAnswerLatex }: AnswerFieldProps) {
    return (
        <EditableMathField 
            className="min-h-[60px] px-2 py-4 min-w-[300px] "
            latex={currentAnswerLatex} 
            onChange={(mathField) => {
                setCurrentAnswerLatex(mathField.latex())
            }}
            config={{
                autoCommands: "pi sqrt"
            }}
        />
    )
}