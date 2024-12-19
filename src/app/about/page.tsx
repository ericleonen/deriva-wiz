import { HomeIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

const smallButtonClassName = "h-12 w-12 rounded-sm bg-white border-2 border-black shadow flex items-center justify-center active:scale-95 hover:bg-amber-400 active:bg-amber-400";

export default function AboutPage() {
    return (
        <div className="w-full h-full overflow-scroll py-12 flex items-center">
            <div className="flex flex-col w-[30rem] mx-auto">
                <div className="flex">
                    <Link 
                        className={smallButtonClassName}
                        href="/"
                    >
                        <HomeIcon className="h-6 w-6"/>
                    </Link>
                    <h2 className="bg-white ml-3 pr-[3.75rem] text-xl font-bold flex-1 h-12 border-2 border-black shadow flex items-center justify-center">
                        About
                    </h2>
                </div>
                <div className="bg-white p-6 border-2 border-black shadow mt-3 font-medium">
                    Deriva-Wiz is a game designed to help you solve derivatives faster.<br /><br />
                    Choose an appropriate difficulty level and solve 20 derivative questions as fast as you can.&nbsp;
                    If a question is too hard, you can skip it, incurring a 30 second time penalty.&nbsp;
                    Try to solve all derivatives with the shortest total time!
                </div>
            </div>
        </div>
    )
}