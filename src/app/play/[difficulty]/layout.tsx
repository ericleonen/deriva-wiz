import { capitalize } from "./utils";

// @ts-ignore
export async function generateMetadata({ params }) {
    return {
        title: `Deriva-Wiz ${capitalize(params.difficulty)} Mode`
    };
}

export default function PlayLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}