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
import { Search } from "lucide-react";
import ClearPlaylistButton from "./ClearPlaylistButton";

const YoutubeQueueInput = ({
	showClearPlaylistButton=false,
}: {
	showClearPlaylistButton?: boolean;
}) => {
	const { playlistId } = useParams();
	const [value, setValue] = useState("");
	const [loading, setLoading] = useState(false);
	const [buttonLabel, setButtonLabel] = useState("Add Music");
	const [searchType, setSearchType] = useState<
		"VIDEO" | "SEARCH" | "PLAYLIST"
	>("VIDEO");
	// const [openDialog, setOpenDialog] = useState(false);
	const [isEdited, setIsEdited] = useState(false);

	const [searchVideoResult, setSearchVideoResult] = useState<
		YoutubeBaseAttributes[]
	>([]);

	const handleAddMusic = (playlistId: string, videoId: string) => {
		setLoading(true);
		QueueService.addVideo(playlistId, videoId).then(() => {
			setValue("");
			setLoading(false);
			socket.emit("reloadQueuesInPlaylist", playlistId);
		});

		// Remove this
		loading;
	};

	const handleOnClickButton = async () => {
		const result = YoutubeService.searchRecognizer(value);
		setIsEdited(false);

		if (!result || !playlistId) return;
		else if (result.type === "VIDEO") {
			handleAddMusic(playlistId, result.id);
		} else if (result.type === "SEARCH" && isEdited) {
			setSearchVideoResult([]);
			YoutubeSearchService.searchByQuery(result.id).then((response) => {
				setSearchVideoResult(response.data.data);
			});
		} else if (result.type === "PLAYLIST" && isEdited) {
			setSearchVideoResult([]);
			YoutubeSearchService.searchByPlaylistId(result.id).then(
				(response) => {
					setSearchVideoResult(response.data.data);
				}
			);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		setIsEdited(true);
		const result = YoutubeService.searchRecognizer(e.target.value);

		if (!result || result.type === "VIDEO" || e.target.value === "") {
			setSearchType("VIDEO");
			setButtonLabel("Add Music");
		} else if (result.type === "SEARCH") {
			setSearchType("SEARCH");
			setButtonLabel("Search Video");
		} else if (result.type === "PLAYLIST") {
			setSearchType("PLAYLIST");
			setButtonLabel("Search Playlist");
		}
	};

	return (
		<div className="flex gap-[8px] md:gap-[16px]">
			<Input
				placeholder="Search your music here ..."
				value={value}
				onChange={(e) => handleChange(e)}
			/>
			{searchType === "VIDEO" ? (
				<Button disabled={value === ""} onClick={handleOnClickButton}>
					<span className="hidden md:block">{buttonLabel}</span>
					<span className="block md:hidden">
						<Search size={18} />
					</span>
				</Button>
			) : (
				<SearchVideoDialog
					searchVideos={searchVideoResult}
					// open={openDialog}
				>
					<Button
						disabled={value === ""}
						onClick={handleOnClickButton}
					>
						<span>{buttonLabel}</span>
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
