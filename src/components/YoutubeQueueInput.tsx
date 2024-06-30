import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { YoutubeService } from "@/services/Youtube.service";
import { QueueService } from "@/services/apis/Queue.service";
import { YoutubeSearchService } from "@/services/apis/YoutubeSearch.service";
import { YoutubePlaylistSearchResult, YoutubeQuerySearchResult } from "@/types/apis/Youtube.api";
import { useParams } from "react-router-dom";
import socket from "@/socket";

const YoutubeQueueInput = () => {

    const { playlistId } = useParams()
    const [value,setValue] = useState("")
    const [loading,setLoading] = useState(false)
    const [searchResult,setSearchResult] = useState<YoutubeQuerySearchResult[] | YoutubePlaylistSearchResult[]
    >([])
    const [buttonLabel,setButtonLabel] = useState("Add Music")

    const handleAddMusic = (playlistId:string, videoId:string) => {
        setLoading(true)
        QueueService.addVideo(playlistId,videoId).then(() => {
            setValue("")
            setLoading(false)
            socket.emit("reloadQueuesInPlaylist",playlistId)
        })
    }

    const handleOnClickButton = () => {
        const result = YoutubeService.searchRecognizer(value)

        if (!result || !playlistId) return

        else if (result.type === "VIDEO") {
            handleAddMusic(playlistId,result.id)
        }
        else if (result.type === "SEARCH") {
            YoutubeSearchService.searchByQuery(result.id).then((response) => {
                response.data.result
            })
        }
        else if (result.type === "PLAYLIST") {
            handleAddMusic(playlistId,result.id)
            YoutubeSearchService.searchByPlaylistId(result.id).then((response) => {
                response.data.result
            })
        }
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        const result = YoutubeService.searchRecognizer(e.target.value)

        if (!result || result.type === "VIDEO" || e.target.value === "") {
            setButtonLabel("Add Music")
        }
        else if (result.type === "SEARCH") {
            setButtonLabel("Search Video")
        }
        else if (result.type === "PLAYLIST") {
            setButtonLabel("Search Playlist")
        }
    }

	return (
		<div className="flex gap-4">
			<Input placeholder="Search your music here ..." value={value} onChange={(e) => handleChange(e)}/>
			<Button disabled={value===''} onClick={handleOnClickButton}>{buttonLabel}</Button>
		</div>
	);
};

export default YoutubeQueueInput;
