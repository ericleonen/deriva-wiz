import { Difficulty } from "@/app/types"
import Link from "next/link"

type DifficultyButtonProps = {
    /**
     * The difficulty of this DifficultyButton.
     */
    difficulty: Difficulty,
    /**
     * A short description of this difficulty level.
     */
    description: string
}

export default function DifficultyButton({ difficulty, description }: DifficultyButtonProps) {
    return (
        <Link 
            href={`/play/${difficulty}`}
            className="py-2 px-3 brutal-box-sm w-full mb-2 hover:opacity-80 active:scale-95"
            style={{
                backgroundColor: `var(--theme-${difficulty})`
            }}
        >
            <p className="text-xl font-bold">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
            <p className="text-black/80 text-sm font-semibold">{description}</p>
        </Link>
    )
}