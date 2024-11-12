import { QueueService } from "@/services/apis/Queue.service";
import socket from "@/socket";
import { ListX } from "lucide-react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";

const ClearPlaylistButton = ({ playlistId }: { playlistId: string }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleClick = () => {
        setIsLoading(true);
		QueueService.clear(playlistId).then(() => {
			socket.emit("reloadQueuesInPlaylist", playlistId);
            setIsLoading(false);
		});
	};

	return (
		<Dialog>
			<DialogTrigger>
				<Button className="text-white bg-red-600 hover:bg-red-700">
                    <span className="hidden lg:block">Clear Playlist</span>
                    <span className="block lg:hidden"><ListX size={18}/></span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Clear Playlist Confirmation</DialogTitle>
				<DialogDescription>
					<p>Are you sure you want to clear this playlist?</p>
					<b>
						This will remove all songs from the playlist and cannot
						be undone.
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
	);
};

export default ClearPlaylistButton;
