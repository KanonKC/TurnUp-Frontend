import { PlaylistService } from "@/services/apis/Playlist.service";
import { QueueService } from "@/services/apis/Queue.service";
import socket from "@/socket";
import { PlaylistModel } from "@/types/apis/Playlist.api";
import { QueueVideoMetadata } from "@/types/apis/Queue.api";
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

		if (!nowPlaying || nowPlaying.currentIndex === null) return;

		console.log("Count up and go next")

		QueueService.countUp(queues[nowPlaying.currentIndex].id).then(
			(res) => {
				console.log("Counted up")
				console.log(res.data)
				return PlaylistService.play.algorithm(nowPlaying.id);
			}
		).then((res) => {
			console.log("Algorithm")
			console.log(res.data)
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
