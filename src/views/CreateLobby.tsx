import { Button } from "@/components/ui/button";
import CenterContainer from "@/layouts/CenterContainer";
import { PlaylistService } from "@/services/apis/Playlist.service";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateLobby = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const handleCreateLobby = async () => {
		// Random between 0 - 999999
		let randomId = Math.floor(Math.random() * 1000000).toString();

		while (randomId.length < 6) {
			randomId = "0" + randomId;
		}

		setIsLoading(true);
		PlaylistService.create(randomId).then((response) => {
			navigate(`/${response.data.id}/player`);
			setIsLoading(false);
		});
	};

	return (
		<CenterContainer>
			<div className="mx-10">
				<div className="font-bold text-xl ">Create New Lobby</div>

				<div>
					<div className="text-neutral-400 text-base">
						Create new lobby with an available room code.
					</div>
					<div className="text-neutral-400 text-base italic">
						(More lobby settings will coming soon!)
					</div>
				</div>
				<div className="mt-5 flex justify-center md:justify-start">
					<Button disabled={isLoading} onClick={handleCreateLobby}>
						{isLoading && <Loader2 className="animate-spin mr-2" />}
						Create
					</Button>
				</div>
			</div>
		</CenterContainer>
	);
};

export default CreateLobby;
