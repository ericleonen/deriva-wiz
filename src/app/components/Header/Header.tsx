import { ReactNode } from "react"

type HeaderProps = {
    children: ReactNode,
    className?: string
}

export default function Header({ children, className }: HeaderProps) {
    return (
        <div className={`${className || ""} w-full flex items-center`}>
            {children}
        </div>
    )
}