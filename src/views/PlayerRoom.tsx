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
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlayerRoom = () => {
	const [queues, setQueues] = useState<QueueVideoMetadata[]>([]);
	const [nowPlaying, setnowPlaying] = useState<PlaylistModel>();

	const { playlistId } = useParams();

	const load = useCallback(() => {
		if (!playlistId) return;

		QueueService.getAll(playlistId)
			.then((response) => {
				console.log("RESPONSE Q", response.data);
				setQueues(response.data.data);
				return PlaylistService.get(playlistId);
			})
			.then((response) => {
				console.log("RESPONSE", response.data);
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
			<CenterContainer>
				<div className="mb-5 mt-10 md:my-10">
					<h1 className="text-5xl md:text-6xl text-center themed-color tracking-widest">
						{playlistId}
					</h1>
				</div>
				<div className="hidden md:flex items-center">
					<div className="w-1/2 flex justify-center mr-10">
						<div>
							<VideoPlayer
								queues={queues}
								nowPlaying={nowPlaying}
							/>
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

				{/* Mobile View */}
				<div className="block md:hidden">
					<div className="flex justify-center">
						<VideoPlayer
							width="288px"
							height="162px"
							queues={queues}
							nowPlaying={nowPlaying}
						/>
					</div>
					<div className="m-2">
						<YoutubeQueueInput showClearPlaylistButton/>
					</div>
					<div className="flex justify-center mx-2">
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
