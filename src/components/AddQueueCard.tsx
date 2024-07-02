import React from "react";
import { Card } from "./ui/card";
import { Trash, X } from "lucide-react";
import { QueueVideoMetadata, QueueVideoMetadataDummy } from "@/types/apis/Queue.api";
import { formatTime } from "@/services/FormatTime.service";
import { PlaylistService } from "@/services/apis/Playlist.service";
import { cn } from "@/lib/utils";
import { CardVariant } from "@/types/CardVariant";
import { YoutubeBaseAttributes, YoutubeBaseAttributesDummy } from "@/types/apis/YoutubeSearch.api";
import { Button } from "./ui/button";
import { QueueService } from "@/services/apis/Queue.service";
import { useParams } from "react-router-dom";
import socket from "@/socket";

const AddQueueCard = ({
	variant = "MID",
	videoMetadata = YoutubeBaseAttributesDummy,
}: {
	variant?: CardVariant;
	videoMetadata?: YoutubeBaseAttributes
}) => {
	// bg-white text-black
	const cardCustomCSS = () => {
		let css = ""

		if (variant === "TOP") {
			return css + "rounded-t-lg ";
		} else if (variant === "MID") {
			return css + "";
		} else if (variant === "BOTTOM") {
			return css + "rounded-b-lg ";
		}
		else if (variant === "ROUND") {
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
		}
		else if (variant === "ROUND") {
			return "rounded-l-lg ";
		}
	};

	const {playlistId} = useParams()

	const handleAddMusic = () => {

		if (!playlistId) return

		QueueService.addVideo(playlistId,videoMetadata.url).then(() => {
			socket.emit("reloadQueuesInPlaylist",playlistId)
		})
	}

	return (
		<Card
			className={cn(cardCustomCSS(),"min-w-[700px]")}
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
						<div className="text-sm text-gray-400">{videoMetadata.channelTitle}</div>
					</div>
					<div className="flex items-center gap-3 mr-3">
						<Button onClick={handleAddMusic}>Add to Queue</Button>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default AddQueueCard;
