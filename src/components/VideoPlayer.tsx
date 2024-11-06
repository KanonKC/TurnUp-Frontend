import { PlaylistService } from "@/services/apis/Playlist.service";
import { QueueService } from "@/services/apis/Queue.service";
import socket from "@/socket";
import { PlaylistModel } from "@/types/apis/Playlist.api";
import { QueueVideoMetadata } from "@/types/apis/Queue.api";
import ReactPlayer from "react-player";

const VideoPlayer = ({
	queues,
	nowPlaying,
    width="640px",
    height="360px",
}: {
	queues: QueueVideoMetadata[];
	nowPlaying: PlaylistModel | undefined;
    width?: string;
    height?: string;
}) => {
	const handleReady = () => {};

	const handleEnd = () => {

		if (!nowPlaying || nowPlaying.currentIndex === null) return;

		QueueService.countUp(queues[nowPlaying.currentIndex].id).then(
			() => {
				return PlaylistService.play.algorithm(nowPlaying.id);
			}
		).then(() => {
			socket.emit("reloadQueuesInPlaylist", nowPlaying.id);
		});
	};

	const handleURL = () => {
		if (!nowPlaying || nowPlaying.currentIndex === null) return;

		return `https://www.youtube.com/watch?v=${
			queues.length > 0 &&
			nowPlaying &&
			queues[nowPlaying.currentIndex].youtubeVideo.youtubeId
		}`;
	};

	return (
		<div className="flex">
			<div className="themed-border">
				<ReactPlayer
                    width={width}
                    height={height}
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
