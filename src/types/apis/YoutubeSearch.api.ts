import { AxiosResponse } from "axios"
import { YoutubePlaylistSearchResult, YoutubeQuerySearchResult } from "./Youtube.api"

export type SearchAPISearchByQueryResponse = {
    result: YoutubeQuerySearchResult[]
}

export type SearchAPISearchByPlaylistIDResponse = {
    result: YoutubePlaylistSearchResult[]
}


export type YoutubeSearchServiceAPI = {
    searchByQuery: (query: string) => Promise<AxiosResponse<SearchAPISearchByQueryResponse>>
    searchByPlaylistId: (id: string) => Promise<AxiosResponse<SearchAPISearchByPlaylistIDResponse>>
}