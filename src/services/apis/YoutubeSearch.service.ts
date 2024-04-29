import { SearchAPISearchByPlaylistIDResponse, SearchAPISearchByQueryResponse, YoutubeSearchServiceAPI } from "@/types/apis/YoutubeSearch.api";
import axios from "axios";
import { BACKEND_URL } from "./BackendURL";

export const YoutubeSearchService: YoutubeSearchServiceAPI = {
    searchByQuery(query) {
        return axios.get<SearchAPISearchByQueryResponse>(`${BACKEND_URL}/api/search/video/${query}`)
    },

    searchByPlaylistId(id){
        return axios.get<SearchAPISearchByPlaylistIDResponse>(`${BACKEND_URL}/api/search/playlist/${id}`)
    }
}