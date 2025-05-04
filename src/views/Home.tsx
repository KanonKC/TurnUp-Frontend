import CreatorContact from "@/components/CreatorContact";
import RecentlyVisitedPlaylistList from "@/components/RecentlyVisitedPlaylistList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CenterContainer from "@/layouts/CenterContainer";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	return (
		<CenterContainer hideBackButton>
			<div className="themed-color text-center text-4xl sm:text-5xl font-bold">
				TURN UP
			</div>
			<div className="flex flex-col gap-2 mt-10">
				<Button className="px-24" onClick={() => navigate("/create")}>
					Create a Lobby
				</Button>
				<div className="flex items-center justify-center gap-2">
					<Separator className="w-[45%]" />
					<div className="text-xs">OR</div>
					<Separator className="w-[45%]" />
				</div>
				<Button
					className="px-24"
					variant="outline"
					onClick={() => navigate("/join")}
				>
					Join an existing Lobby
				</Button>
				<RecentlyVisitedPlaylistList />
				<div className="mt-5">
					<CreatorContact/>
				</div>
			</div>
		</CenterContainer>
	);
};

export default Home;
