import Content from "@/app/components/Content"
import Header from "@/app/components/Header"
import HeaderLabel from "@/app/components/Header/HeaderLabel"
import TinyButton from "@/app/components/Header/TinyButton"
import { capitalize } from "@/app/utils"
import { Difficulty } from "@/app/types"
import { HomeIcon, PlayIcon } from "@heroicons/react/16/solid"
import rules from "../../rules.json"
import dynamic from "next/dynamic"

const DerivativeRule = dynamic(() => import("./DerivativeRule"), {
    ssr: false
});

type SectionProps = {
    difficulty: Difficulty
}

export default function Section({ difficulty }: SectionProps) {
    return (
        <div 
            id={difficulty} 
            className="mt-3 scroll-m-3"
        >
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
            <Content>
                {
                    rules[difficulty]?.map(rule => (
                        <DerivativeRule key={rule.name} rule={rule} />
                    ))
                }
            </Content>
        </div>
    )
}