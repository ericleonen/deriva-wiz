import Link from "next/link"

type ExternalLinkProps = {
    /**
     * The text display of this ExternalLink.
     */
    label: string,
    /**
     * Clicking this ExternalLink brings you to the given href.
     */
    href: string
}

export default function ExternalLink({ label, href }: ExternalLinkProps) {
    return (
        <Link 
            className="text-blue-500 hover:text-blue-600 underline"
            href={href}
        >
            {label}
        </Link>
    )
}