import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Deriva-Wiz About"
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}