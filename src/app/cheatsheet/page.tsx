"use client"

import { addStyles, StaticMathField } from "react-mathquill";
import { difficultyColors } from "../play/[difficulty]/uiConfig";
import { capitalize } from "../play/[difficulty]/utils";
import rules from "./rules.json";
import React, { useEffect } from "react";
import { HomeIcon, PlayIcon } from "@heroicons/react/16/solid";
import TinyButton from "../components/Header/TinyButton";
import { Difficulty } from "../types";
import Header from "../components/Header";
import HeaderLabel from "../components/Header/HeaderLabel";

const difficulties: Difficulty[] = ["easy", "intermediate", "hard"];

export default function CheatsheetPage() {
    useEffect(() => {
        addStyles();
    }, []);

    return (
        <div className="w-full h-full overflow-scroll py-12">
            <div className="flex flex-col w-[30rem] mx-auto">
                <h1 className="text-2xl font-bold w-full p-3 border-2 border-black shadow text-center bg-amber-300">Deriva-Wiz Cheatsheet</h1>
                {
                    difficulties.map((difficulty: Difficulty) => (
                        <div id={difficulty} key={difficulty} className="mt-3 scroll-m-3">
                            <Header className="mb-3">
                                <TinyButton
                                    Icon={HomeIcon}
                                    href="/"
                                    difficulty={difficulty}
                                    title="Home"
                                />
                                <HeaderLabel
                                    label={capitalize(difficulty) + " Derivatives"}
                                    difficulty={difficulty}
                                />
                                <TinyButton
                                    Icon={PlayIcon}
                                    href={"/play/" + difficulty}
                                    difficulty={difficulty}
                                    title={`Play ${capitalize(difficulty)} Mode`}
                                />
                            </Header>
                            <div className="bg-white border-2 border-black shadow p-3 pb-3">
                                {
                                    rules[difficulty]?.map(rule => (
                                        <div className="flex items-center hover:bg-gray-200 p-3 rounded-sm" key={rule.name}>
                                            <span className="font-bold mr-1">{rule.name}:</span>
                                            <StaticMathField>{`\\frac{d}{dx}\\left(${rule["function"]}\\right)=${rule.derivative}`}</StaticMathField>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}