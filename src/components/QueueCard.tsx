import React from "react";
import { Card } from "./ui/card";
import { Trash, X } from "lucide-react";
import { QueueVideoMetadata, QueueVideoMetadataDummy } from "@/types/apis/Queue.api";
import { formatTime } from "@/services/FormatTime.service";
import { PlaylistService } from "@/services/apis/Playlist.service";
import { cn } from "@/lib/utils";

export type QueueCardVariant = "TOP" | "MID" | "BOTTOM" | "ROUND"

const QueueCard = ({
	variant = "MID",
	queueVideoMetadata = QueueVideoMetadataDummy,
	active = false,
	onClick=()=>{},
	readOnly = false
}: {
	variant?: QueueCardVariant;
	queueVideoMetadata?: QueueVideoMetadata
	active?: boolean;
	onClick?: () => void
	readOnly?: boolean
}) => {
	// bg-white text-black
	const cardCustomCSS = () => {
		let css = ""

		if (active) {
			css = "bg-[#4d4d4d] "
		}

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

	return (
		<Card
			onClick={onClick}
			className={cn(cardCustomCSS(),"w-[700px]",{
				"cursor-pointer": !readOnly
			})}
		>
			<div className="flex">
				<div className="w-1/5">
					<img
						className={imgCustomCSS()}
						src={queueVideoMetadata.video.thumbnail}
					/>
				</div>
				<div className="w-4/5 mx-2 flex justify-between items-center">
					<div className="mr-5 ml-1">
						<div className="text-md">{queueVideoMetadata.video.title}</div>
						<div className="text-sm text-gray-400">{queueVideoMetadata.video.channel_title}</div>
					</div>
					<div className="flex items-center gap-3 mr-3">
						<div className="text-md">{formatTime(queueVideoMetadata.video.duration)}</div>
						{!readOnly && <Trash className="cursor-pointer hover:text-red-500" size={20}/>}
					</div>
				</div>
			</div>
		</Card>
	);
};

export default QueueCard;
