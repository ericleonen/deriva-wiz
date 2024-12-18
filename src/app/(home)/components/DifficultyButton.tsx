import { difficultyColors } from "@/app/play/[difficulty]/uiConfig"
import Link from "next/link"

type DifficultyButtonProps = {
    difficulty: "easy" | "intermediate" | "hard",
    description: string
}

export default function DifficultyButton({ difficulty, description }: DifficultyButtonProps) {
    return (
        <Link 
            href={`/play/${difficulty}`}
            className="py-2 px-3 shadow-sm border-2 border-black w-full mb-2 hover:opacity-80 rounded-sm active:scale-95"
            style={{
                backgroundColor: difficultyColors[difficulty]
            }}
        >
            <p className="text-xl font-bold">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
            <p className="text-black/80 text-sm font-semibold">{description}</p>
        </Link>
    )
}