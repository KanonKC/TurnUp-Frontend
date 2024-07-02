import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { YoutubeService } from "@/services/Youtube.service";
import { QueueService } from "@/services/apis/Queue.service";
import { YoutubeSearchService } from "@/services/apis/YoutubeSearch.service";
import {
	YoutubePlaylistSearchResult,
	YoutubeQuerySearchResult,
} from "@/types/apis/Youtube.api";
import { useParams } from "react-router-dom";
import socket from "@/socket";
import SearchVideoDialog from "./SearchVideoDialog";
import { YoutubeBaseAttributes } from "@/types/apis/YoutubeSearch.api";

const YoutubeQueueInput = () => {
	const { playlistId } = useParams();
	const [value, setValue] = useState("");
	const [loading, setLoading] = useState(false);
	const [buttonLabel, setButtonLabel] = useState("Add Music");
    const [searchType, setSearchType] = useState<"VIDEO" | "SEARCH" | "PLAYLIST">("VIDEO");
	const [openDialog, setOpenDialog] = useState(false);
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
	};

	const handleOnClickButton = async () => {
		const result = YoutubeService.searchRecognizer(value);
        setIsEdited(false);

		if (!result || !playlistId) return;
		else if (result.type === "VIDEO") {
			handleAddMusic(playlistId, result.id);
		} else if (result.type === "SEARCH" && isEdited) {
            setSearchVideoResult([])
			YoutubeSearchService.searchByQuery(result.id).then((response) => {
				setSearchVideoResult(response.data.data);
			});
		} else if (result.type === "PLAYLIST" && isEdited) {
            setSearchVideoResult([])
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
			setSearchType("SEARCH")
			setButtonLabel("Search Video");
		} else if (result.type === "PLAYLIST") {
            setSearchType("PLAYLIST")
			setButtonLabel("Search Playlist");
		}
	};

	return (
		<div className="flex gap-4">
			<Input
				placeholder="Search your music here ..."
				value={value}
				onChange={(e) => handleChange(e)}
			/>
			{searchType === "VIDEO" ? (
                <Button disabled={value === ""} onClick={handleOnClickButton}>
                    {buttonLabel}
                </Button>
            ) : (<SearchVideoDialog
				searchVideos={searchVideoResult}
				open={openDialog}
			>
				<Button disabled={value === ""} onClick={handleOnClickButton}>
					{buttonLabel}
				</Button>
			</SearchVideoDialog>)}
		</div>
	);
};

export default YoutubeQueueInput;
