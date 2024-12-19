"use client"

import React from "react";
import { Difficulty } from "../types";
import Title from "../components/Title";
import Section from "./components/Section";

const difficulties: Difficulty[] = ["easy", "intermediate", "hard"];

export default function CheatsheetPage() {
    return (
        <div className="w-full h-full overflow-scroll py-12">
            <div className="flex flex-col w-[30rem] mx-auto">
                <Title title="Derivative Cheatsheet" />
                {
                    difficulties.map((difficulty: Difficulty) => (
                        <Section key={difficulty} difficulty={difficulty} />
                    ))
                }
            </div>
        </div>
    )
}