import { Difficulty } from "@/app/types"

type HeaderLabelProps = {
    /**
     * The text label displayed by this HeaderLabel.
     */
    label: string,
    /**
     * If given, themes this HeaderLabel according to that given difficulty. Otherwise, applies the
     * default white theme.
     */
    difficulty?: Difficulty,
    className?: string
}

export default function HeaderLabel({ label, difficulty, className }: HeaderLabelProps) {
    return (
        <div 
            className={`${className || ""} brutal-box h-12 font-bold flex-1 flex items-center justify-center mx-3 text-lg`}
            style={{
                backgroundColor: difficulty ? `var(--theme-${difficulty})` : "white"
            }}
        >
            {label}
        </div>
    )
}