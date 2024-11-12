import { cn } from "@/lib/utils";
import { PlaylistService } from "@/services/apis/Playlist.service";
import socket from "@/socket";
import { PlaylistModel } from "@/types/apis/Playlist.api";
import { QueueVideoMetadata } from "@/types/apis/Queue.api";
import { CardVariant } from "@/types/CardVariant";
import { ListPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import QueueCard from "./QueueCard";
import { ScrollArea } from "./ui/scroll-area";
import { QueueService } from "@/services/apis/Queue.service";

const QueueCardPlaylist = ({
	queues,
	nowPlaying,
	readOnly = false,
}: {
	queues: QueueVideoMetadata[];
	nowPlaying: PlaylistModel | undefined;
	readOnly?: boolean;
}) => {
	const [sortableQueues, setSortableQueues] = useState<QueueVideoMetadata[]>(
		[]
	);

	const [isLoading, setIsLoading] = useState(false);
    const [isSortableEnd, setIsSortableEnd] = useState(false);

	const handleOnClick = async (queueId: string) => {
		if (!nowPlaying || readOnly) return;

		await PlaylistService.play.queue(nowPlaying.id, queueId);
		socket.emit("reloadQueuesInPlaylist", nowPlaying.id);
	};

	const handleSortableEnd = async () => {
        setIsSortableEnd(true);
	};

	useEffect(() => {
		const payload = sortableQueues.map((queue, i) => ({
			queueId: queue.id,
			order: i,
		}));
		if (nowPlaying && isSortableEnd) {
            setIsLoading(true);
			QueueService.reOrder(nowPlaying.id, { queues: payload }).then(
				() => {
                    socket.emit("reloadQueuesInPlaylist", nowPlaying.id);
                    setIsSortableEnd(false);
                    setIsLoading(false);
				}
			);
		}
	}, [sortableQueues, nowPlaying, isSortableEnd]);

	useEffect(() => {
		setSortableQueues(queues);
	}, [queues]);

	return queues.length > 0 ? (
		<ScrollArea className={cn("h-[40vh] lg:h-[50vh] lg:pr-5")}>
			<ReactSortable
				disabled={isLoading || readOnly}
				onEnd={handleSortableEnd}
				animation={150}
				list={sortableQueues}
				setList={setSortableQueues}
			>
				{sortableQueues.map((queueData, i) => {
					let variant: CardVariant = "MID";

					if (queues.length === 1) variant = "ROUND";
					else if (i === 0) variant = "TOP";
					else if (i === queues.length - 1) variant = "BOTTOM";

					const active =
						nowPlaying &&
						queueData.id === nowPlaying.currentQueueId;

					return (
						<QueueCard
							readOnly={readOnly}
							key={queueData.id}
							queueVideoMetadata={queueData}
							variant={variant}
							active={active}
							onClick={() => handleOnClick(queueData.id)}
						/>
					);
				})}
			</ReactSortable>
		</ScrollArea>
	) : (
		<div className="h-[40vh] lg:h-[50vh] rounded-md flex justify-center items-center">
			<div className="">
				<div className="flex justify-center text-neutral-500">
					<ListPlus size={32} />
				</div>
				<div className="text-xs text-center text-neutral-500">
					Queue is empty. Add some music to the queue!
				</div>
			</div>
		</div>
	);
};

export default QueueCardPlaylist;
