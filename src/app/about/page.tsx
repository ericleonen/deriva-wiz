import { HomeIcon } from "@heroicons/react/16/solid";
import TinyButton from "../components/Header/TinyButton";
import Header from "../components/Header";
import HeaderLabel from "../components/Header/HeaderLabel";

export default function AboutPage() {
    return (
        <div className="w-full h-full overflow-scroll py-12 flex items-center">
            <div className="flex flex-col w-[30rem] mx-auto">
                <Header className="mb-3">
                    <TinyButton
                            Icon={HomeIcon}
                            href="/"
                    />
                    <HeaderLabel label="About" className="pr-[3.75rem] mr-0"/>
                </Header>
                <div className="bg-white p-6 border-2 border-black shadow font-medium">
                    Deriva-Wiz is a game designed to help you solve derivatives faster.<br /><br />
                    Choose an appropriate difficulty level and solve 20 derivative questions as fast as you can.&nbsp;
                    If a question is too hard, you can skip it, incurring a 30 second time penalty.&nbsp;
                    Try to solve all derivatives with the shortest total time!
                </div>
            </div>
        </div>
    )
}