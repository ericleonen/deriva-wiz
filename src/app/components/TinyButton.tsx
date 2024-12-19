import { ForwardRefExoticComponent, SVGProps } from "react"
import { Difficulty } from "../types"
import Link from "next/link";

type TinyButtonProps = {
    /**
     * The text label of this TinyButton. Either label or Icon (not both) must be provided.
     */
    label?: string,
    /**
     * The icon of this TinyButton. Either label or Icon (not both) must be provided.
     */
    Icon?: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref">>,
    /**
     * When this TinyButton is clicked, performs the given function. Either onClick or href (not
     * both) must be provided.
     */
    onClick?: () => void,
    /**
     * When this Tiny Button is clicked, takes user to the given href. Either onClick or href (not
     * both) must be provided.
     */
    href?: string,
    /**
     * If given, themes this TinyButton according to that given difficulty. Otherwise, applies the
     * default white theme.
     */
    difficulty?: Difficulty,
    /**
     * The (optional) label of the tooltip when this TinyButton is hovered.
     */
    title?: string
}

const baseClassName = "h-12 flex items-center justify-center";

export default function TinyButton({ label, Icon, onClick, href, difficulty, title }: TinyButtonProps) {
    if (label && Icon)
        throw new Error("You cannot provide both a label and Icon, only one.");
    else if (!label && !Icon)
        throw new Error("You must provide a label or Icon.");
    else if (onClick && href)
        throw new Error("You cannot provide both onClick and href, only one.");
    else if (!onClick && !href)
        throw new Error("You must provide an onClick or href.");

    const display = Icon ? <Icon className="h-6 w-6" /> : label as string;
    const className = `brutal-box button ${baseClassName} ${label ? "px-2 font-bold" : "w-12"}`;
    const style = {
        backgroundColor: difficulty ? `var(--theme-${difficulty})` : "white"
    };

    if (onClick) { // function button
        return (
            <button 
                onClick={onClick}
                className={className}
                style={style}
                title={title}
            >
                {display}
            </button>
        )
    } else { // link button
        return (
            <Link
                href={href!}
                className={className}
                style={style}
                title={title}
            >
                {display}
            </Link>
        )
    }
}