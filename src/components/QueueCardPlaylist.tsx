import { cn } from "@/lib/utils";
import { PlaylistService } from "@/services/apis/Playlist.service";
import { QueueService } from "@/services/apis/Queue.service";
import socket from "@/socket";
import { useAppSelector } from "@/stores/hooks";
import {
    QueueVideoMetadata
} from "@/types/apis/Queue.api";
import { CardVariant } from "@/types/CardVariant";
import { ListPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import QueueCard from "./QueueCard";
import { ScrollArea } from "./ui/scroll-area";

const QueueCardPlaylist = ({ readOnly = false }: { readOnly?: boolean }) => {
	const queues = useAppSelector((state) => state.playlist.queues);
	const playlist = useAppSelector((state) => state.playlist);

	const [sortableQueues, setSortableQueues] = useState<QueueVideoMetadata[]>(
		[]
	);

	const [isLoading, setIsLoading] = useState(false);
	const [isSortableEnd, setIsSortableEnd] = useState(false);

	const handleOnClick = async (queueId: string) => {
		if (!playlist || readOnly) return;

		await PlaylistService.play.queue(playlist.id, queueId);
		socket.emit("reloadQueuesInPlaylist", playlist.id);
	};

	const handleSortableEnd = async () => {
		setIsSortableEnd(true);
	};

	useEffect(() => {
		const payload = sortableQueues.map((queue, i) => ({
			queueId: queue.id,
			order: i,
		}));
		if (playlist && isSortableEnd) {
			setIsLoading(true);
			QueueService.reOrder(playlist.id, { queues: payload }).then(() => {
				socket.emit("reloadQueuesInPlaylist", playlist.id);
				setIsSortableEnd(false);
				setIsLoading(false);
			});
		}
	}, [sortableQueues, playlist, isSortableEnd]);

	// useEffect(() => {
	// 	setSortableQueues(queues);
	// }, [queues]);

	useEffect(() => {
        if (!playlist) return;
        PlaylistService.get(playlist.id).then((res) => {
            setSortableQueues(res.data.queues);
		});
	}, [playlist]);

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
						playlist && queueData.id === playlist.currentQueueId;

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
