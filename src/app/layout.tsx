import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";

export const metadata: Metadata = {
    title: "Deriva-Wiz",
    description: "Solve derivatives faster",
};

const montserratFont = Montserrat({
    subsets: ["latin"]
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body
                className={`${montserratFont.className}`}
            >
                <div className="relative h-screen w-screen flex justify-center items-center bg-gray-200 overflow-hidden">
                    {children}
                </div>
            </body>
        </html>
    );
}
