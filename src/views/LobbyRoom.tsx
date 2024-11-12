import QueueCard from "@/components/QueueCard";
import QueueCardPlaylist from "@/components/QueueCardPlaylist";
import { Button } from "@/components/ui/button";
import YoutubeQueueInput from "@/components/YoutubeQueueInput";
import CenterContainer from "@/layouts/CenterContainer";
import ValidLobbyContainer from "@/layouts/ValidLobbyContainer";
import { PlaylistService } from "@/services/apis/Playlist.service";
import { QueueService } from "@/services/apis/Queue.service";
import socket from "@/socket";
import { PlaylistModel } from "@/types/apis/Playlist.api";
import { QueueVideoMetadata } from "@/types/apis/Queue.api";
import { MonitorPlay } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LobbyRoom = () => {
	const [queues, setQueues] = useState<QueueVideoMetadata[]>([]);
	const [nowPlaying, setnowPlaying] = useState<PlaylistModel>();

	const { playlistId } = useParams();

	const navigate = useNavigate();

	const isIndexDefined = useMemo(
		() => nowPlaying?.currentQueueId,
		[nowPlaying]
	);

	const load = useCallback(() => {
		if (!playlistId) return;
		QueueService.getAll(playlistId)
			.then((response) => {
				setQueues(response.data.data);
				return PlaylistService.get(playlistId);
			})
			.then((response) => {
				setnowPlaying(response.data);
			});
	}, [playlistId]);

	useEffect(() => {
		load();

		socket.on("reloadQueuesInPlaylist", (socketPlaylistId: string) => {
			if (socketPlaylistId === playlistId) {
				load();
			}
		});

		return () => {
			socket.off("reloadQueuesInPlaylist");
		};
	}, [load, playlistId]);

	return (
		<ValidLobbyContainer>
			<CenterContainer className="w-[800px]">
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
						{isIndexDefined && nowPlaying?.currentQueue && (
							<div>
								<div className="font-bold mb-1 text-sm md:text-md">
									NOW{" "}
									<span className="themed-color">
										PLAYING
									</span>
								</div>
								<div className="">
									<QueueCard
										queueVideoMetadata={nowPlaying?.currentQueue}
										readOnly
										variant="ROUND"
									/>
								</div>
							</div>
						)}
					</div>

					{queues.length > 0 && (
						<div className="font-bold mb-1 text-sm md:text-md">
							QUEUE
						</div>
					)}
					<QueueCardPlaylist
						readOnly
						queues={queues}
						nowPlaying={nowPlaying}
					/>
				</div>
			</CenterContainer>
		</ValidLobbyContainer>
	);
};

export default LobbyRoom;
