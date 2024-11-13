import { PlaylistService } from "@/services/apis/Playlist.service";
import { QueueService } from "@/services/apis/Queue.service";
import socket from "@/socket";
import { useAppSelector } from "@/stores/hooks";
import ReactPlayer from "react-player";

const VideoPlayer = ({
    width="640px",
    height="360px",
}: {
    width?: string;
    height?: string;
}) => {

    const queues = useAppSelector((state) => state.playlist.queues);
    const playlist = useAppSelector((state) => state.playlist);

	const handleReady = () => {};

	const handleEnd = () => {

		if (!playlist || !playlist.currentQueueId) return;

		QueueService.countUp(playlist.currentQueueId).then(
			() => {
				// return PlaylistService.play.algorithm(playlist.id);
                return PlaylistService.play.next(playlist.id);
			}
		).then(() => {
			socket.emit("reloadQueuesInPlaylist", playlist.id);
		});
	};

	const handleURL = () => {
		if (!playlist || !playlist.currentQueueId) return;

		return `https://www.youtube.com/watch?v=${
			queues.length > 0 &&
			playlist &&
            playlist.currentQueue?.youtubeVideo.youtubeId
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
