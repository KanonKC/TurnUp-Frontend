import { AxiosResponse } from "axios"
import { YoutubePlaylistSearchResult, YoutubeQuerySearchResult } from "./Youtube.api"
import { ListAPIResponse } from "../ListAPI"

export type SearchAPISearchByQueryResponse = {
    result: YoutubeQuerySearchResult[]
}

export type SearchAPISearchByPlaylistIDResponse = {
    result: YoutubePlaylistSearchResult[]
}

export interface YoutubeBaseAttributes {
    title: string
    channelTitle: string
    description: string
    thumbnail: string
    url: string
}

export const YoutubeBaseAttributesDummy: YoutubeBaseAttributes = {
    title: "Video Title",
    channelTitle: "Channel Title",
    description: "AKlskdkwlkladk askdklwkaldlsklkd walkdlskldklwkalkdlk sdlwklakdlk",
    thumbnail: "https://i.ytimg.com/vi/q6H3rxUA40Q/mqdefault.jpg",
    url: "abc"
}


export type YoutubeSearchServiceAPI = {
    searchByQuery: (query: string) => Promise<AxiosResponse<ListAPIResponse<YoutubeBaseAttributes[]>>>
    searchByPlaylistId: (id: string) => Promise<AxiosResponse<ListAPIResponse<YoutubeBaseAttributes[]>>>
}