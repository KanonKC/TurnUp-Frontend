import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import QueueCard, { QueueCardVariant } from "./QueueCard";
import { QueueVideoMetadata } from "@/types/apis/Queue.api";
import { PlaylistModel } from "@/types/apis/Playlist.api";
import { PlaylistService } from "@/services/apis/Playlist.service";
import socket from "@/socket";

const QueueCardPlaylist = ({
	queues,
	nowPlaying,
	readOnly = false,
}: {
	queues: QueueVideoMetadata[];
	nowPlaying: PlaylistModel | undefined;
	readOnly?: boolean;
}) => {

	const handleOnClick = async (index:number) => {

		if (!nowPlaying || readOnly) return

		await PlaylistService.play.index(nowPlaying.id, index)
		socket.emit("reloadQueuesInPlaylist",nowPlaying.id)
	}

	return (
		<ScrollArea className="h-[50vh] pr-5">
			{queues.length === 0 ? (
				<div className="invisible">
					<QueueCard />
				</div>
			) : (
				queues.map((queueData, i) => {
					let variant: QueueCardVariant = "MID";

					if (queues.length === 1) variant = "ROUND";
					else if (i === 0) variant = "TOP";
					else if (i === queues.length - 1) variant = "BOTTOM";

					let active = nowPlaying && i === nowPlaying.current_index;

					return (
						<QueueCard
							readOnly={readOnly}
							key={queueData.id}
							queueVideoMetadata={queueData}
							variant={variant}
							active={active}
							onClick={() => handleOnClick(i)}
						/>
					);
				})
			)}
			<div className="pt-1"></div>
		</ScrollArea>
	);
};

export default QueueCardPlaylist;
