import QuestionMarkCircleIcon from "@heroicons/react/16/solid/QuestionMarkCircleIcon";
import DifficultyButton from "./components/DifficultyButton";
import { BookOpenIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

const smallButtonClassName = "h-12 w-12 rounded-sm bg-white border-2 border-black shadow flex items-center justify-center hover:bg-amber-300 active:scale-95";

export default function HomePage() {
	return (
		<div className="flex flex-col items-center w-[30rem]">
			<h1 className="z-20 text-5xl font-bold p-3 rounded-sm w-full border-2 border-black shadow text-center bg-amber-300 ">Deriva-Wiz</h1>
			<div className="flex items-center my-3 w-full">
				<Link href="/about" className={smallButtonClassName} title="What is this?">
					<QuestionMarkCircleIcon className="h-6 w-6"/>
				</Link>
				<div className="font-semibold flex items-center text-lg justify-center h-12 w-auto flex-1 mx-3 rounded-sm bg-white border-2 border-black shadow">
					Solve derivatives faster
				</div>
				<Link href="/cheatsheet" className={smallButtonClassName} title="Derivative Cheatsheet">
					<BookOpenIcon className="h-6 w-6" />
				</Link>
			</div>
			<div className="flex flex-col items-center w-full rounded-sm bg-white border-2 border-black shadow p-3">
				<p className="mb-3 font-bold text-sm">Choose a difficulty</p>
				<DifficultyButton 
					difficulty="easy"
					description="Fundamental rules and basic chain rule" 
				/>
				<DifficultyButton 
					difficulty="intermediate"
					description="Products, quotients, and more" 
				/>
				<DifficultyButton
					difficulty="hard"
					description="Rare rules and tougher expressions"
				/>
			</div>
		</div>
	)
}