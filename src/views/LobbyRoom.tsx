import QueueCard from "@/components/QueueCard";
import QueueCardPlaylist from "@/components/QueueCardPlaylist";
import ShareDialog from "@/components/ShareDialog";
import { Button } from "@/components/ui/button";
import YoutubeQueueInput from "@/components/YoutubeQueueInput";
import CenterContainer from "@/layouts/CenterContainer";
import ValidLobbyContainer from "@/layouts/ValidLobbyContainer";
import { useAppSelector } from "@/stores/hooks";
import { MonitorPlay, Share2 } from "lucide-react";
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
				<div className="absolute right-5 top-5">
					<div className="flex gap-2">
						<ShareDialog>
							<Button>
								<span className="mr-2 hidden md:block">
									Share this Lobby
								</span>
								<Share2 size={20} />
							</Button>
						</ShareDialog>
						<Button
							variant="outline"
							onClick={() => navigate("./player")}
						>
							<span className="mr-2 hidden md:block">
								Go to Player Room
							</span>

							<MonitorPlay size={20} />
						</Button>
					</div>
				</div>
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
										queueVideoMetadata={
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
