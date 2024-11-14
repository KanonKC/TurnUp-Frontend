import { cn } from "@/lib/utils";
import { QueueService } from "@/services/apis/Queue.service";
import socket from "@/socket";
import { CardVariant } from "@/types/CardVariant";
import {
    YoutubeBaseAttributes,
    YoutubeBaseAttributesDummy,
} from "@/types/apis/YoutubeSearch.api";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const AddQueueCard = ({
	variant = "MID",
	videoMetadata = YoutubeBaseAttributesDummy,
}: {
	variant?: CardVariant;
	videoMetadata?: YoutubeBaseAttributes;
}) => {
	// bg-white text-black
    const [isLoading, setIsLoading] = useState(false);

	const cardCustomCSS = () => {
		const css = "";

		if (variant === "TOP") {
			return css + "rounded-t-lg ";
		} else if (variant === "MID") {
			return css + "";
		} else if (variant === "BOTTOM") {
			return css + "rounded-b-lg ";
		} else if (variant === "ROUND") {
			return css + "rounded-lg ";
		}
	};

	const imgCustomCSS = () => {
		if (variant === "TOP") {
			return "rounded-tl-lg ";
		} else if (variant === "MID") {
			return "";
		} else if (variant === "BOTTOM") {
			return "rounded-bl-lg ";
		} else if (variant === "ROUND") {
			return "rounded-l-lg ";
		}
	};

	const { playlistId } = useParams();

	const handleAddMusic = async () => {
		if (!playlistId) return;

        setIsLoading(true);
		await QueueService.addVideo(playlistId, videoMetadata.url)
        socket.emit("reloadQueuesInPlaylist", playlistId);
        setIsLoading(false);
	};

	return (
		<div>
			<Card
				className={cn(cardCustomCSS(), "hidden sm:block min-w-[700px]")}
			>
				<div className="flex">
					<div className="w-1/5">
						<img
							className={imgCustomCSS()}
							src={videoMetadata.thumbnail}
						/>
					</div>
					<div className="w-4/5 mx-2 flex justify-between items-center">
						<div className="mr-5 ml-1">
							<div className="text-md">{videoMetadata.title}</div>
							<div className="text-sm text-neutral-400">
								{videoMetadata.channelTitle}
							</div>
						</div>
						<div className="flex items-center gap-3 mr-3">
							<Button disabled={isLoading} onClick={handleAddMusic}>
								Add to Queue
							</Button>
						</div>
					</div>
				</div>
			</Card>
			<Card className={cn("sm:hidden rounded-lg", {
                "bg-neutral-500": isLoading
            })} onClick={handleAddMusic}>
				<img className="rounded-t-lg" src={videoMetadata.thumbnail} />
				<div className="p-[8px]">
					<div className="text-sm">{videoMetadata.title}</div>
					<div className="text-xs text-neutral-400">
						{videoMetadata.channelTitle}
					</div>
				</div>
			</Card>
		</div>
	);
};

export default AddQueueCard;
