type BeginButtonProps = {
    onClick: () => void
}

export default function BeginButton({ onClick }: BeginButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-full mt-6 brutal-box-sm text-xl py-2 px-3 font-bold button"
        >
            Begin
        </button>
    )
}