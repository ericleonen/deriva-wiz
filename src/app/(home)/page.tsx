import DifficultyButton from "./components/DifficultyButton";

export default function HomePage() {
	return (
		<>
			<div className="flex flex-col items-center">
				<h1 className="text-5xl font-bold">Deriva-Wiz</h1>
				<p className="text-xl mt-1 font-medium">Solve derivatives faster.</p>
				<div className="mt-6 flex flex-col items-center w-[20rem]">
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
		</>
	)
}