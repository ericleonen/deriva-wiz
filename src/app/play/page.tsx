"use client"

import createEasyQuestion from "@/lib/question-generator/easy";
import { useState } from "react"
import { addStyles, EditableMathField } from "react-mathquill";

if (window) addStyles();

for (let i = 0; i < 5; i++) {
    console.log(createEasyQuestion().latex);
}

export default function PlayPage() {
    const [latex, setLatex] = useState("");

    return (
        <div className="h-screen w-screen flex">
            <div className="h-[600px] w-[800px] m-auto overflow-hidden border-4 border-black">
                <canvas className="h-[350px] w-full">

                </canvas>
                <div className="h-[250px] w-full text-xl">
                    <EditableMathField 
                        className="w-[300px] p-4"
                        latex={latex} 
                        onChange={(mathField) => {
                            setLatex(mathField.latex())
                        }}
                    />
                </div>
            </div>
        </div>
    )
}