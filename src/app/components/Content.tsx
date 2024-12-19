import { ReactNode } from "react"

type ContentProps = {
    children: ReactNode,
    className?: string
}

export default function Content({ children, className }: ContentProps) {
    return (
        <div className={`${className || ""} brutal-box bg-white w-full p-3`}>
            {children}
        </div>
    )
}