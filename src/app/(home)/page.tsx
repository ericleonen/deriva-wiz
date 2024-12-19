import QuestionMarkCircleIcon from "@heroicons/react/16/solid/QuestionMarkCircleIcon";
import DifficultyButton from "./components/DifficultyButton";
import { BookOpenIcon } from "@heroicons/react/16/solid";
import TinyButton from "../components/Header/TinyButton";
import Header from "../components/Header";
import HeaderLabel from "../components/Header/HeaderLabel";

export default function HomePage() {
	return (
		<div className="flex flex-col items-center w-[30rem]">
			<h1 className="z-20 text-5xl font-bold p-3 rounded-sm w-full border-2 border-black shadow text-center bg-amber-300 ">Deriva-Wiz</h1>
			<Header>
				<TinyButton
					Icon={QuestionMarkCircleIcon}
					href="/about"
					title="What is this?"
				/>
				<HeaderLabel 
					label="Solve derivatives faster" 
					className="my-3"
				/>
				<TinyButton 
					Icon={BookOpenIcon}
					href="/cheatsheet"
					title="Derivative Cheatsheet"
				/>
			</Header>
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