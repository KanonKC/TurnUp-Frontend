import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { PlaylistModel } from "@/types/apis/Playlist.api";
import { QueueVideoMetadata } from "@/types/apis/Queue.api";
import { useParams } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";

const VideoPlayerAndQRCodeCarousel = ({
	queues,
	nowPlaying,
	width = "640px",
	height = "360px",
}: {
	queues: QueueVideoMetadata[];
	nowPlaying: PlaylistModel | undefined;
	width?: string;
	height?: string;
}) => {
	const { playlistId } = useParams();

	return (
		<Carousel>
			<CarouselContent className=" flex items-center">
				<CarouselItem>
					<div className="flex justify-center">
						<VideoPlayer
							queues={queues}
							nowPlaying={nowPlaying}
							width={width}
							height={height}
						/>
					</div>
				</CarouselItem>
				<CarouselItem className="flex items-center justify-center">
					<div className="themed-border">
						<img
							className="hidden sm:block"
							src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${window.location.origin}/${playlistId}`}
							alt={`turnup_qr_${playlistId}`}
						/>
						<img
							className="sm:hidden"
							src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.origin}/${playlistId}`}
							alt={`turnup_qr_${playlistId}`}
						/>
					</div>
				</CarouselItem>
			</CarouselContent>
            <span className="hidden sm:block">
				<CarouselNext />
			</span>
			<span className="hidden sm:block">
				<CarouselPrevious />
			</span>
		</Carousel>
	);
};

export default VideoPlayerAndQRCodeCarousel;
