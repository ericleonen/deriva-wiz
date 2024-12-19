import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Deriva-Wiz Cheatsheet"
};

export default function CheatsheetLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}