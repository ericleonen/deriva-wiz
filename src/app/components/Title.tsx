type TitleProps = {
    title: string
}

export default function Title({ title }: TitleProps) {
    return (
        <h1 className="text-4xl font-bold py-3 w-full brutal-box text-center bg-amber-300">
            {title}
        </h1>
    )
}