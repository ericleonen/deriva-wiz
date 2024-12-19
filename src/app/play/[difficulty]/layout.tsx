import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Play Deriva-Wiz"
};

export default function PlayLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}