import { SearchAPISearchByPlaylistIDResponse, SearchAPISearchByQueryResponse, YoutubeBaseAttributes, YoutubeSearchServiceAPI } from "@/types/apis/YoutubeSearch.api";
import axios from "axios";
import { BACKEND_URL } from "./BackendURL";
import { ListAPIResponse } from "@/types/ListAPI";

export const YoutubeSearchService: YoutubeSearchServiceAPI = {
    searchByQuery(query) {
        return axios.get<ListAPIResponse<YoutubeBaseAttributes[]>>(`${BACKEND_URL}/youtube/videos/${query}`)
        // return axios.get<SearchAPISearchByQueryResponse>(`${BACKEND_URL}/search/video/${query}`)
    },

    searchByPlaylistId(id){
        return axios.get<ListAPIResponse<YoutubeBaseAttributes[]>>(`${BACKEND_URL}/youtube/playlist/${id}`)
    }
}