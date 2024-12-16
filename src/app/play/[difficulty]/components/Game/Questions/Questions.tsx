import Function from "@/lib/symbo-diff/Function"
import Question from "./Question"

type QuestionsProps = {
    questions: Function[],
    currentQuestionIndex: number,
    answersLatex: string[]
}

export default function Questions({ questions, currentQuestionIndex, answersLatex }: QuestionsProps) {
    return (
        <div 
            className="text-2xl flex flex-col-reverse items-end transition-transform"
            style={{
                transform: `translateY(calc(${100 / questions.length}% * ${0.5 + currentQuestionIndex} - 50%))`
            }}
        >{
            questions.map((question: Function, questionIndex: number) =>
                <Question 
                    key={`question_${questionIndex}`}
                    question={question} 
                    questionIndexDist={Math.abs(currentQuestionIndex - questionIndex)}
                    answerLatex={answersLatex[questionIndex]}
                />    
            )
        }</div>
    )
}