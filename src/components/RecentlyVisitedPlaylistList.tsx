import { getVisitedPlaylistList, VisitedPlaylist } from "@/util/LocalStorage";
import { LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";

const RecentlyVisitedPlaylistList = () => {
	function relativeDateText(date: Date) {
		const diff = new Date().getTime() - date.getTime();
		console.log("Diff", diff);
		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const months = Math.floor(days / 30);
		const years = Math.floor(months / 12);
		if (years > 0) {
			return `${years} year${years > 1 ? "s" : ""} ago`;
		} else if (months > 0) {
			return `${months} month${months > 1 ? "s" : ""} ago`;
		} else if (days > 0) {
			return `${days} day${days > 1 ? "s" : ""} ago`;
		} else if (hours > 0) {
			return `${hours} hour${hours > 1 ? "s" : ""} ago`;
		} else if (minutes > 0) {
			return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
		} else if (seconds > 10) {
			return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
		} else {
            return "just now";
        }
	}

    const nagivate = useNavigate()

    const navigateToPlaylistLobby = (playlistId: string) => {
        nagivate(`/${playlistId}`)
    }

	const [visitedPlaylistList, setVisitedPlaylistList] = useState<
		VisitedPlaylist[]
	>([]);

	useEffect(() => {
		setVisitedPlaylistList(getVisitedPlaylistList());
	}, []);

	return (
		<ScrollArea className="flex flex-col gap-[4px] h-[210px]">
			{visitedPlaylistList.map((playlist) => (
				<div className="mb-[4px]">
					<Card
						onClick={() => navigateToPlaylistLobby(playlist.playlistId)}
						className="px-[16px] py-[12px] rounded-md cursor-pointer hover:bg-gray-700"
					>
						<div className="flex items-center justify-between">
							<div>
								<div className="font-bold">
									{playlist.playlistId}
								</div>
								<div className="text-xs text-gray-500">
									{" "}
									Visited {relativeDateText(playlist.date)}
								</div>
							</div>
							<div>
								<LogIn size={24} />
							</div>
						</div>
					</Card>
				</div>
			))}
		</ScrollArea>
	);
};

export default RecentlyVisitedPlaylistList;
