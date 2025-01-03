import QuestionMarkCircleIcon from "@heroicons/react/16/solid/QuestionMarkCircleIcon";
import DifficultyButton from "./components/DifficultyButton";
import { BookOpenIcon } from "@heroicons/react/16/solid";
import TinyButton from "../components/Header/TinyButton";
import Header from "../components/Header";
import HeaderLabel from "../components/Header/HeaderLabel";
import Content from "../components/Content";
import Title from "../components/Title";

export default function HomePage() {
	return (
		<div className="flex flex-col items-center w-[30rem]">
			<Title title="Deriva-Wiz" />
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
			<Content className="flex flex-col items-center">
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
			</Content>
		</div>
	)
}