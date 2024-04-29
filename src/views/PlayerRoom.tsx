import AppTitle from "@/components/AppTitle";
import ClearPlaylistButton from "@/components/ClearPlaylistButton";
import QueueCard, { QueueCardVariant } from "@/components/QueueCard";
import QueueCardPlaylist from "@/components/QueueCardPlaylist";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import VideoPlayer from "@/components/VideoPlayer";
import YoutubeQueueInput from "@/components/YoutubeQueueInput";
import CenterContainer from "@/layouts/CenterContainer";
import { PlaylistService } from "@/services/apis/Playlist.service";
import { QueueService } from "@/services/apis/Queue.service";
import { PlaylistModel } from "@/types/apis/Playlist.api";
import { QueueVideoMetadata } from "@/types/apis/Queue.api";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const PlayerRoom = () => {
	const [queues, setQueues] = useState<QueueVideoMetadata[]>([]);
	const [nowPlaying, setnowPlaying] = useState<PlaylistModel>();

	const load = () => {
		QueueService.getAll("1")
			.then((response) => {
				setQueues(response.data.queues);
				return PlaylistService.get("1");
			})
			.then((response) => {
				setnowPlaying(response.data);
			});
	};

	useEffect(() => {
		setInterval(load, 1000);
	}, []);

	return (
		<CenterContainer>
			<div className="my-10">
				<h1 className="text-6xl text-center themed-color">
					5 4 6 1 3 7
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
								playlistId={nowPlaying?.playlist_id ?? ""}
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
	);
};

export default PlayerRoom;
