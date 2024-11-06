import { PlaylistService } from "@/services/apis/Playlist.service";
import socket from "@/socket";
import { PlaylistModel } from "@/types/apis/Playlist.api";
import { QueueVideoMetadata } from "@/types/apis/Queue.api";
import { CardVariant } from "@/types/CardVariant";
import QueueCard from "./QueueCard";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { ListPlus } from "lucide-react";

const QueueCardPlaylist = ({
	queues,
	nowPlaying,
	readOnly = false,
}: {
	queues: QueueVideoMetadata[];
	nowPlaying: PlaylistModel | undefined;
	readOnly?: boolean;
}) => {
	const handleOnClick = async (index: number) => {
		if (!nowPlaying || readOnly) return;

		await PlaylistService.play.index(nowPlaying.id, index);
		socket.emit("reloadQueuesInPlaylist", nowPlaying.id);
	};

	return queues.length > 0 ? (
		<ScrollArea className={cn("h-[40vh] md:h-[50vh] md:pr-5")}>
			{queues.map((queueData, i) => {
				let variant: CardVariant = "MID";

				if (queues.length === 1) variant = "ROUND";
				else if (i === 0) variant = "TOP";
				else if (i === queues.length - 1) variant = "BOTTOM";

				const active = nowPlaying && i === nowPlaying.currentIndex;

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
			})}
			<div className="pt-1"></div>
		</ScrollArea>
	) : (
		<div className="h-[40vh] md:h-[50vh] rounded-md flex items-center">
			<div>
				<div className="border h-1 invisible">
					<QueueCard />
				</div>
				<div className="flex justify-center text-gray-500">
					<ListPlus size={32} />
				</div>
				<div className="text-xs text-center text-gray-500">
					Queue is empty. Add some music to the queue!
				</div>
			</div>
		</div>
	);
};

export default QueueCardPlaylist;
