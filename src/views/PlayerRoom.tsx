import ClearPlaylistButton from "@/components/ClearPlaylistButton";
import QueueCardPlaylist from "@/components/QueueCardPlaylist";
import { Separator } from "@/components/ui/separator";
import VideoPlayerAndQRCodeCarousel from "@/components/VideoPlayerAndQRCodeCarousel";
import YoutubeQueueInput from "@/components/YoutubeQueueInput";
import CenterContainer from "@/layouts/CenterContainer";
import ValidLobbyContainer from "@/layouts/ValidLobbyContainer";
import { useAppSelector } from "@/stores/hooks";

const PlayerRoom = () => {
	// const [queues, setQueues] = useState<QueueVideoMetadata[]>([]);
	// const [playlist, setplaylist] = useState<PlaylistModel>();

	const playlist = useAppSelector((state) => state.playlist);
	

	return (
		<ValidLobbyContainer>
			<CenterContainer className="mx-5 2xl:mx-32">
				<div className="mb-4 mt-10 lg:my-10">
					<h1 className="text-5xl lg:text-6xl text-center themed-color tracking-widest">
						{playlist?.id}
					</h1>
				</div>
				<div className="hidden lg:flex items-center">
					<div className="w-1/2 flex justify-center mr-5">
						<VideoPlayerAndQRCodeCarousel />
					</div>
					<div className="w-1/2 ml-10">
						<div className="flex mb-5">
							<div className="w-5/6">
								<YoutubeQueueInput />
							</div>
							<div className="mx-2">
								<Separator orientation="vertical" />
							</div>
							<div>
								<ClearPlaylistButton
									playlistId={playlist?.id ?? ""}
								/>
							</div>
						</div>

						<QueueCardPlaylist />
					</div>
				</div>

				{/* Mobile View */}
				<div className="block lg:hidden">
					<div className="flex justify-center">
						<VideoPlayerAndQRCodeCarousel
							width="288px"
							height="162px"
						/>
					</div>
					<div className="m-2">
						<YoutubeQueueInput showClearPlaylistButton />
					</div>
					<div className="flex justify-center mx-2">
						<QueueCardPlaylist />
					</div>
				</div>
			</CenterContainer>
		</ValidLobbyContainer>
	);
};

export default PlayerRoom;
