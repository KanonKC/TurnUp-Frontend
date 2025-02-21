import { useAppSelector } from "@/stores/hooks";
import CustomSpotifyPlayer from "./SpotifyPlayer";
import YoutubePlayer from "./YoutubePlayer";

const VideoPlayer = ({
	width = "640px",
	height = "360px",
}: {
	width?: string;
	height?: string;
}) => {
	const playlist = useAppSelector((state) => state.playlist);
	width;
	height;
	return (
		<div className="flex">
			{playlist.currentQueue?.type === "youtube-video" && (
				<YoutubePlayer />
			)}
			{playlist.currentQueue?.type === "spotify-track" && (
				<CustomSpotifyPlayer />
			)}
		</div>
	);
};

export default VideoPlayer;
