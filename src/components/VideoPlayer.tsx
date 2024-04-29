import { PlaylistService } from "@/services/apis/Playlist.service";
import { QueueService } from "@/services/apis/Queue.service";
import { PlaylistModel } from "@/types/apis/Playlist.api";
import { QueueVideoMetadata } from "@/types/apis/Queue.api";
import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({
	queues,
	nowPlaying,
}: {
	queues: QueueVideoMetadata[];
	nowPlaying: PlaylistModel | undefined;
}) => {
	const handleReady = () => {};

	const handleEnd = () => {

		console.log("End")

		if (!nowPlaying || nowPlaying.current_index === null) return;

		QueueService.countUp(queues[nowPlaying.current_index].queue_id).then(
			() => {
				return PlaylistService.play.algorithm(nowPlaying.playlist_id);
			}
		);
	};

	const handleURL = () => {
		if (!nowPlaying || nowPlaying.current_index === null) return;

		return `https://www.youtube.com/watch?v=${
			queues.length > 0 &&
			nowPlaying &&
			queues[nowPlaying.current_index].video.youtube_id
		}`;
	};

	return (
		<div className="flex">
			<div className="themed-border">
				<ReactPlayer
					light={true}
					controls
					playing
					// url="https://www.youtube.com/watch?v=ESaJdXc5QQ8"
					url={handleURL()}
					onReady={() => handleReady()}
					onEnded={() => handleEnd()}
				/>
			</div>
		</div>
	);
};

export default VideoPlayer;
