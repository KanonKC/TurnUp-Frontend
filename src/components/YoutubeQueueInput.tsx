import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { YoutubeService } from "@/services/Youtube.service";
import { QueueService } from "@/services/apis/Queue.service";
import { YoutubeSearchService } from "@/services/apis/YoutubeSearch.service";
import { YoutubePlaylistSearchResult, YoutubeQuerySearchResult } from "@/types/apis/Youtube.api";

const YoutubeQueueInput = () => {

    const playlistId = "1"
    const [value,setValue] = useState("")
    const [loading,setLoading] = useState(false)
    const [searchResult,setSearchResult] = useState<YoutubeQuerySearchResult[] | YoutubePlaylistSearchResult[]
    >([])

    const handleAddMusic = (playlistId:string, videoId:string) => {
        setLoading(true)
        QueueService.addVideo(playlistId,videoId).then(() => {
            setValue("")
            console.log("Added Success")
            setLoading(false)
        })
    }

    const handleOnClickButton = () => {
        console.log(value)
        const result = YoutubeService.searchRecognizer(value)

        if (!result) return

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

	return (
		<div className="flex gap-4">
			<Input placeholder="Search your music here ..." value={value} onChange={(e) => setValue(e.target.value)}/>
			<Button onClick={handleOnClickButton}>Add Music</Button>
		</div>
	);
};

export default YoutubeQueueInput;
