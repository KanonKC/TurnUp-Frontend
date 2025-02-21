import { PlaylistService } from "@/services/apis/Playlist.service";
import { QueueService } from "@/services/apis/Queue.service";
import socket from "@/socket";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setIsPlaying } from "@/stores/slices/playlistSlice";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const YoutubePlayer = ({
	width = "640px",
	height = "360px",
}: {
	width?: string;
	height?: string;
}) => {
	const queues = useAppSelector((state) => state.playlist.queues);
	const playlist = useAppSelector((state) => state.playlist);

    const dispatch = useAppDispatch();
	const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
	const [videoPlayerUrl, setVideoPlayerUrl] = useState<string>("");

	const handleReady = () => {
		console.log("handleReady");
		setIsVideoPlayerPlay(true);
	};

	const handleEnd = () => {
		if (!playlist || !playlist.currentQueueId) return;

		QueueService.countUp(playlist.currentQueueId)
			.then(() => {
				// return PlaylistService.play.algorithm(playlist.id);
				return PlaylistService.play.next(playlist.id);
			})
			.then(() => {
				socket.emit("reloadQueuesInPlaylist", playlist.id);
			});
	};

	// const handleURL = () => {
	// 	if (
	// 		!playlist ||
	// 		!playlist.currentQueue ||
	// 		!playlist.currentQueue?.youtubeVideo
	// 	)
	// 		return;

	// 	return `https://www.youtube.com/watch?v=${
	// 		queues.length > 0 &&
	// 		playlist &&
	// 		playlist.currentQueue.youtubeVideo.youtubeId
	// 	}`;
	// };

	useEffect(() => {
		console.log("videoPlayerUrl", videoPlayerUrl);
		if (videoPlayerUrl) {
			console.log("setIsVideoPlayerPlay(true)");
            dispatch(setIsPlaying(true));
		}
	}, [videoPlayerUrl, dispatch]);

	useEffect(() => {
		if (
			playlist.currentQueue?.type !== "youtube-video" ||
			!playlist.currentQueue?.youtubeVideo
		){
            console.log("return");
			return;
        }

		setVideoPlayerUrl(
			`https://www.youtube.com/watch?v=${
				queues.length > 0 &&
				playlist &&
				playlist.currentQueue.youtubeVideo.youtubeId
			}`
		);
	}, [queues, playlist]);

	return (
		<div className="themed-border">
			<ReactPlayer
				width={width}
				height={height}
				light={true}
				controls
				playing={isPlaying}
				// url="https://www.youtube.com/watch?v=ESaJdXc5QQ8"
				url={videoPlayerUrl}
				onReady={() => handleReady()}
				onEnded={() => handleEnd()}
			/>
		</div>
	);
};

export default YoutubePlayer;
