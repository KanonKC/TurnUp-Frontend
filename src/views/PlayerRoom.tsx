import ClearPlaylistButton from "@/components/ClearPlaylistButton";
import QueueCardPlaylist from "@/components/QueueCardPlaylist";
import { Separator } from "@/components/ui/separator";
import VideoPlayer from "@/components/VideoPlayer";
import YoutubeQueueInput from "@/components/YoutubeQueueInput";
import CenterContainer from "@/layouts/CenterContainer";
import ValidLobbyContainer from "@/layouts/ValidLobbyContainer";
import { PlaylistService } from "@/services/apis/Playlist.service";
import { QueueService } from "@/services/apis/Queue.service";
import socket from "@/socket";
import { PlaylistModel } from "@/types/apis/Playlist.api";
import { QueueVideoMetadata } from "@/types/apis/Queue.api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlayerRoom = () => {
	const [queues, setQueues] = useState<QueueVideoMetadata[]>([]);
	const [nowPlaying, setnowPlaying] = useState<PlaylistModel>();

	const { playlistId } = useParams();

	// const targetId = "21b5cb52-f3aa-41c5-8be9-30f832c0be0f"

	const load = () => {

		if (!playlistId) return;

		QueueService.getAll(playlistId)
			.then((response) => {
				setQueues(response.data.data);
				return PlaylistService.get(playlistId);
			})
			.then((response) => {
				console.log("RESPONSE", response.data);
				setnowPlaying(response.data);
			});
	};

	// useEffect(() => {
	// 	load();
	// 	const timer = setInterval(load, 1000);
	// 	return () => clearInterval(timer);
	// }, []);

	useEffect(() => {
		load();

		socket.on("reloadQueuesInPlaylist", (socketPlaylistId: string) => {
			if (socketPlaylistId === playlistId) {
				load();
			}
		})

		return () => {
			socket.off("reloadQueuesInPlaylist");
		}
	}, []);

	// useEffect(() => {
	// 	console.log("NOW PLAYING", nowPlaying);
	// },[nowPlaying])

	return (
		<ValidLobbyContainer>
			<CenterContainer>
				<div className="my-10">
					<h1 className="text-6xl text-center themed-color tracking-widest">
						{playlistId}
					</h1>
				</div>
				<div className="flex items-center">
					<div className="w-1/2 flex justify-center mr-10">
						<div>
							<VideoPlayer queues={queues} nowPlaying={nowPlaying} />
						</div>
					</div>
					<div className="w-1/2 ml-10">
						<div className="flex mb-5">
							<div className="w-5/6">
								<YoutubeQueueInput />
							</div>
							<div className="mx-2">
								<Separator orientation="vertical" />
							</div>
							<div>
								<ClearPlaylistButton
									playlistId={nowPlaying?.id ?? ""}
								/>
							</div>
						</div>

						<QueueCardPlaylist
							queues={queues}
							nowPlaying={nowPlaying}
						/>
					</div>
				</div>
			</CenterContainer>
		</ValidLobbyContainer>
	);
};

export default PlayerRoom;
