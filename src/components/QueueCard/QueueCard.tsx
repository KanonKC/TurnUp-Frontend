import { cn } from "@/lib/utils";
import { formatTime } from "@/services/FormatTime.service";
import { QueueService } from "@/services/apis/Queue.service";
import socket from "@/socket";
import { CardVariant } from "@/types/CardVariant";
import { QueueModel, QueueModelDummy } from "@/types/apis/Queue.api";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from "../ui/dialog";

const QueueCard = ({
	variant = "MID",
	queue = QueueModelDummy,
	active = false,
	onClick = () => {},
	readOnly = false,
}: {
	variant?: CardVariant;
	queue?: QueueModel;
	active?: boolean;
	onClick?: () => void;
	readOnly?: boolean;
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isOpenDialog, setIsOpenDialog] = useState(false);

	const cardCustomCSS = () => {
		let css = "";

		if (active) {
			css = "bg-[#4d4d4d] ";
		}

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

	const handleClickDeleteButton = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		e.stopPropagation();
		setIsOpenDialog(true);
	};

	const handleRemoveMusic = async () => {
		setIsLoading(true);
		await QueueService.remove(queue.id);
		socket.emit("reloadQueuesInPlaylist", queue.playlistId);
        setIsOpenDialog(false);
		setIsLoading(false);
	};

    useEffect(() => {
        // console.log(queue)
    }, [queue])

	return (
		<div>
			<Card
				onClick={onClick}
				className={cn(cardCustomCSS(), "", {
					"cursor-pointer": !readOnly,
				})}
			>
				<div className="flex">
					<div className="w-1/5">
						{queue.youtubeVideo && <img
							className={imgCustomCSS()}
							src={queue.youtubeVideo.thumbnail}
						/>}
						{queue.spotifyTrack && <img
                            width={60}
							className={imgCustomCSS()}
							src={queue.spotifyTrack.thumbnail}
						/>}
					</div>
					<div className="w-4/5 ml-[1px] lg:mx-2 flex justify-between items-center">
						<div className="mr-5 ml-1 w-5/6">
							<div className="text-[9px] lg:text-[14px] 2xl:text-[16px]">
								{queue.youtubeVideo && queue.youtubeVideo.title}
								{queue.spotifyTrack && queue.spotifyTrack.title}
							</div>
							<div className="text-[8px] lg:text-[12px] 2xl:text-[14px] text-neutral-400">
								{queue.youtubeVideo && queue.youtubeVideo.channelTitle}
                                {queue.spotifyTrack && queue.spotifyTrack.artist}
							</div>
						</div>
						<div className="flex items-center gap-3 mr-3">
							<div className="hidden lg:block text-sm lg:text-md">
								{queue.youtubeVideo && formatTime(queue.youtubeVideo.duration)}
								{queue.spotifyTrack && formatTime(queue.spotifyTrack.duration)}
							</div>
							{!readOnly && (
								<div
									onClick={(e) => handleClickDeleteButton(e)}
								>
									<Trash
										className="hidden lg:block cursor-pointer hover:text-red-500"
										size={20}
									/>
									<Trash
										className="block lg:hidden cursor-pointer hover:text-red-500"
										size={12}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</Card>
			<Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
				<DialogContent>
					<DialogTitle>Remove Video Confirmation</DialogTitle>
					<DialogDescription>
						<p>
							Are you sure you want to remove{" "}
							<span className="text-white">
								"
								{queue.youtubeVideo && queue.youtubeVideo.title}
								"
							</span>{" "}
							from the queue?
						</p>
						<b>This cannot be undone.</b>
					</DialogDescription>
					<DialogFooter>
						<div className="flex justify-end mt-4">
							<Button
								disabled={isLoading}
								onClick={handleRemoveMusic}
								className="text-white bg-red-600 hover:bg-red-700"
							>
								Delete
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default QueueCard;
