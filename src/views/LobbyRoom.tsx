import LoginToSpotifyButton from "@/components/LoginToSpotifyButton";
import QueueCard from "@/components/QueueCard/QueueCard";
import QueueCardPlaylist from "@/components/QueueCardPlaylist";
import { Button } from "@/components/ui/button";
import YoutubeQueueInput from "@/components/YoutubeQueueInput";
import CenterContainer from "@/layouts/CenterContainer";
import ValidLobbyContainer from "@/layouts/ValidLobbyContainer";
import { useAppSelector } from "@/stores/hooks";
import { MonitorPlay } from "lucide-react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LobbyRoom = () => {
	const queues = useAppSelector((state) => state.playlist.queues);
	const playlist = useAppSelector((state) => state.playlist);

	const { playlistId } = useParams();

	const navigate = useNavigate();

	const isIndexDefined = useMemo(() => playlist?.currentQueueId, [playlist]);

	return (
		<ValidLobbyContainer>
			<CenterContainer className="w-[800px]">
                <LoginToSpotifyButton />
				<Button
					onClick={() => navigate("./player")}
					className="absolute right-5 top-5"
				>
					Go to Player Room
					<MonitorPlay size={20} className="ml-2" />
				</Button>
				<div className="my-5">
					<h1 className="text-6xl text-center themed-color tracking-widest">
						{playlistId}
					</h1>
				</div>
				<div className="mx-2 ">
					<div>
						<YoutubeQueueInput />
					</div>

					<div className="my-3">
						{isIndexDefined && playlist?.currentQueue && (
							<div>
								<div className="font-bold mb-1 text-sm lg:text-md">
									NOW{" "}
									<span className="themed-color">
										PLAYING
									</span>
								</div>
								<div className="">
									<QueueCard
										QueueModel={
											playlist?.currentQueue
										}
										readOnly
										variant="ROUND"
									/>
								</div>
							</div>
						)}
					</div>

					{queues.length > 0 && (
						<div className="font-bold mb-1 text-sm lg:text-md">
							QUEUE
						</div>
					)}
					<QueueCardPlaylist readOnly />
				</div>
			</CenterContainer>
		</ValidLobbyContainer>
	);
};

export default LobbyRoom;
