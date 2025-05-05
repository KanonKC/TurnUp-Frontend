import Github from "@/assets/github.png";

const CreatorContact = () => {
	return (
		<div className="flex justify-center items-center">
			<a
				target="_blank"
				href="https://github.com/KanonKC?tab=repositories&q=TurnUp"
			>
				<img src={Github} width={20} className="mr-2" />
			</a>
			<span className="text-neutral-400 text-sm">
				made by{" "}
				<a
					target="_blank"
					href="https://github.com/KanonKC"
					className="font-bold text-neutral-100"
				>
					@KanonKC
				</a>
			</span>
		</div>
	);
};

export default CreatorContact;
