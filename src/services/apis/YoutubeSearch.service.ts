import { YoutubeBaseAttributes, YoutubeSearchServiceAPI } from "@/types/apis/YoutubeSearch.api";
import { ListAPIResponse } from "@/types/ListAPI";
import axios from "axios";
import { BACKEND_URL } from "./BackendURL";

export const YoutubeSearchService: YoutubeSearchServiceAPI = {
    searchByQuery(query) {
        return axios.get<ListAPIResponse<YoutubeBaseAttributes[]>>(`${BACKEND_URL}/youtube/videos/${query}`)
        // return axios.get<SearchAPISearchByQueryResponse>(`${BACKEND_URL}/search/video/${query}`)
    },

    searchByPlaylistId(id){
        return axios.get<ListAPIResponse<YoutubeBaseAttributes[]>>(`${BACKEND_URL}/youtube/playlist/${id}`)
    }
}