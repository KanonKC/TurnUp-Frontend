import { QueueService } from "@/services/apis/Queue.service";
import socket from "@/socket";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setIsLoading } from "@/stores/slices/playlistSlice";
import { ListX } from "lucide-react";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from "./ui/dialog";
import { useState } from "react";

const ClearPlaylistButton = ({ playlistId }: { playlistId: string }) => {
	const isLoading = useAppSelector((state) => state.playlist.isLoading);
	const dispatch = useAppDispatch();

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleClick = async () => {
		dispatch(setIsLoading(true));
		await QueueService.clear(playlistId);
		socket.emit("reloadQueuesInPlaylist", playlistId);
        setIsDialogOpen(false);
		dispatch(setIsLoading(false));
	};

	return (
		<div>
			<Button
				className="text-white bg-red-600 hover:bg-red-700"
				onClick={() => setIsDialogOpen(true)}
			>
				<span className="hidden lg:block">Clear Playlist</span>
				<span className="block lg:hidden">
					<ListX size={18} />
				</span>
			</Button>
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogTitle>Clear Playlist Confirmation</DialogTitle>
					<DialogDescription>
						<p>Are you sure you want to clear this playlist?</p>
						<b>
							This will remove all songs from the playlist and
							cannot be undone.
						</b>
					</DialogDescription>
					<DialogFooter>
						<div className="flex justify-end mt-4">
							<Button
								disabled={isLoading}
								className="text-white bg-red-600 hover:bg-red-700"
								onClick={handleClick}
							>
								Clear Playlist
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ClearPlaylistButton;
