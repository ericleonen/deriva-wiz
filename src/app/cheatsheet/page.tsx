"use client"

import { addStyles, StaticMathField } from "react-mathquill";
import { difficultyColors } from "../play/[difficulty]/uiConfig";
import { capitalize } from "../play/[difficulty]/utils";
import rules from "./rules.json";
import React, { useEffect } from "react";
import { HomeIcon, PlayIcon } from "@heroicons/react/16/solid";
import TinyButton from "../components/TinyButton";
import { Difficulty } from "../types";

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
                        <React.Fragment key={difficulty}>
                            <div id={difficulty} className="flex mt-3 scroll-m-3">
                                <TinyButton
                                    Icon={HomeIcon}
                                    href="/"
                                    difficulty={difficulty}
                                    title="Home"
                                />
                                <h2
                                    className="flex-1 mx-3 text-xl font-bold w-full h-12 border-2 border-black shadow flex items-center justify-center"
                                    style={{
                                        backgroundColor: difficultyColors[difficulty]
                                    }}
                                >
                                    {capitalize(difficulty)} Derivatives
                                </h2>
                                <TinyButton
                                    Icon={PlayIcon}
                                    href={"/play/" + difficulty}
                                    difficulty={difficulty}
                                    title={`Play ${capitalize(difficulty)} Mode`}
                                />
                            </div>
                            <div className="bg-white border-2 border-black shadow mt-3 p-3 pb-3">
                                {
                                    rules[difficulty]?.map(rule => (
                                        <div className="flex items-center hover:bg-gray-200 p-3 rounded-sm" key={rule.name}>
                                            <span className="font-bold mr-1">{rule.name}:</span>
                                            <StaticMathField>{`\\frac{d}{dx}\\left(${rule["function"]}\\right)=${rule.derivative}`}</StaticMathField>
                                        </div>
                                    ))
                                }
                            </div>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}