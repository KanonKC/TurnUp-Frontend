import { CardVariant } from "@/types/CardVariant";
import { YoutubeBaseAttributes } from "@/types/apis/YoutubeSearch.api";
import AddQueueCard from "./AddQueueCard";
import QueueCard from "./QueueCard";
import { ScrollArea } from "./ui/scroll-area";

const AddQueueCardGroup = ({
	searchVideos = [],
}: // readOnly = false,
{
	searchVideos?: YoutubeBaseAttributes[];
	// readOnly?: boolean;
}) => {
	// const handleOnClick = async (index:number) => {

	// 	// await PlaylistService.play.index(playlist.id, index)
	// 	// socket.emit("reloadQueuesInPlaylist",playlist.id)
	// }

	return (
		<ScrollArea className="h-[40vh] pr-3 lg:h-[50vh] lg:pr-5 h-[400px]">
			{searchVideos.length === 0 ? (
				<div className="invisible">
					<QueueCard />
				</div>
			) : (
				searchVideos.map((queueData, i) => {
					let variant: CardVariant = "MID";

					if (searchVideos.length === 1) variant = "ROUND";
					else if (i === 0) variant = "TOP";
					else if (i === searchVideos.length - 1) variant = "BOTTOM";

					return (
						<div className="my-[8px] sm:my-0">
                            <AddQueueCard
                                key={i}
                                videoMetadata={queueData}
                                variant={variant}
                            />
                        </div>
					);
				})
			)}
			<div className="pt-1"></div>
		</ScrollArea>
	);
};

export default AddQueueCardGroup;
