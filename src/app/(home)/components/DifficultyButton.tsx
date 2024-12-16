import { difficultyColors } from "@/app/play/[difficulty]/uiConfig"

type DifficultyButtonProps = {
    difficulty: "easy" | "intermediate" | "hard",
    description: string
}

export default function DifficultyButton({ difficulty, description }: DifficultyButtonProps) {
    return (
        <a 
            href={`/play/${difficulty}`}
            className="text-lg py-2 px-3 border-2 border-b-4 border-black w-full mb-2 hover:opacity-80 rounded-md active:scale-95"
            style={{
                backgroundColor: difficultyColors[difficulty]
            }}
        >
            <p className="text-lg font-bold">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
            <p className="text-white text-sm font-semibold">{description}</p>
        </a>
    )
}