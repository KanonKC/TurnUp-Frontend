import { YoutubeService } from "@/services/Youtube.service";
import { QueueService } from "@/services/apis/Queue.service";
import { YoutubeSearchService } from "@/services/apis/YoutubeSearch.service";
import socket from "@/socket";
import { YoutubeBaseAttributes } from "@/types/apis/YoutubeSearch.api";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchVideoDialog from "./SearchVideoDialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, Search } from "lucide-react";
import ClearPlaylistButton from "./ClearPlaylistButton";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setIsLoading } from "@/stores/slices/playlistSlice";

const YoutubeQueueInput = ({
	showClearPlaylistButton = false,
}: {
	showClearPlaylistButton?: boolean;
}) => {
	const { playlistId } = useParams();
	const isLoading = useAppSelector((state) => state.playlist.isLoading);
	const dispatch = useAppDispatch();

	const [value, setValue] = useState("");
	const [buttonLabel, setButtonLabel] = useState("Add Video");
	const [searchType, setSearchType] = useState<
		"VIDEO" | "SEARCH" | "PLAYLIST"
	>("VIDEO");
	// const [openDialog, setOpenDialog] = useState(false);
	const [isEdited, setIsEdited] = useState(false);

	const [searchVideoResult, setSearchVideoResult] = useState<
		YoutubeBaseAttributes[]
	>([]);

	const handleAddMusic = async (playlistId: string, videoId: string) => {
		dispatch(setIsLoading(true));
		await QueueService.addYoutubeVideo(playlistId, videoId);
		setValue("");
		socket.emit("reloadQueuesInPlaylist", playlistId);
		dispatch(setIsLoading(false));
	};

	const handleOnClickButton = async () => {
		const result = YoutubeService.searchRecognizer(value);
		setIsEdited(false);

		if (!result || !playlistId) return;
		else if (result.type === "VIDEO") {
			handleAddMusic(playlistId, result.id);
		} else if (result.type === "SEARCH" && isEdited) {
            dispatch(setIsLoading(true));
			setSearchVideoResult([]);
			const response = await YoutubeSearchService.searchByQuery(result.id)
            setSearchVideoResult(response.data.data);
            dispatch(setIsLoading(false));
		} else if (result.type === "PLAYLIST" && isEdited) {
            dispatch(setIsLoading(true));
			setSearchVideoResult([]);
			const response = await YoutubeSearchService.searchByPlaylistId(result.id)
            setSearchVideoResult(response.data.data);
            dispatch(setIsLoading(false));
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		setIsEdited(true);
		const result = YoutubeService.searchRecognizer(e.target.value);

		if (!result || result.type === "VIDEO" || e.target.value === "") {
			setSearchType("VIDEO");
			setButtonLabel("Add Video");
		} else if (result.type === "SEARCH") {
			setSearchType("SEARCH");
			setButtonLabel("Search Video");
		} else if (result.type === "PLAYLIST") {
			setSearchType("PLAYLIST");
			setButtonLabel("Search Playlist");
		}
	};

	return (
		<div className="flex gap-[8px] lg:gap-[16px]">
			<Input
				placeholder="Search your music here ..."
				value={value}
				onChange={(e) => handleChange(e)}
			/>
			{searchType === "VIDEO" ? (
				<Button
					disabled={value === "" || isLoading}
					onClick={handleOnClickButton}
				>
					<span className="hidden lg:block">{buttonLabel}</span>
					<span className="block lg:hidden">
						<Plus size={18} />
					</span>
				</Button>
			) : (
				<SearchVideoDialog
					searchVideos={searchVideoResult}
					// open={openDialog}
				>
					<Button
						disabled={value === "" || isLoading}
						onClick={handleOnClickButton}
					>
						<span className="hidden lg:block">{buttonLabel}</span>
						<span className="block lg:hidden">
							<Search size={18} />
						</span>
					</Button>
				</SearchVideoDialog>
			)}
			{showClearPlaylistButton && (
				<ClearPlaylistButton playlistId={playlistId!} />
			)}
		</div>
	);
};

export default YoutubeQueueInput;
