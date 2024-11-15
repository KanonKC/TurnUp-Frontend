import { AxiosResponse } from "axios"
import { ListAPIResponse } from "../ListAPI"


export interface YoutubeVideo {
    id: string
    youtubeId: string
    title: string
    channelTitle: string
    description: string
    thumbnail: string
    duration: number
}

export interface SpotifyTrack {
    id: string;
    spotifyUri: string;
    title: string;
    artist: string;
    thumbnail: string;
    duration: number;
    createdAt: string;
}
export interface QueueModel {
    id: string
    type: "youtube-video" | "spotify-track"
    playedCount: number
    playlistId: string
    youtubeVideoId: string | null;
    youtubeVideo: YoutubeVideo | null;
    spotifyTrackId: string | null;
    spotifyTrack: SpotifyTrack | null;
}

export const QueueModelDummy:QueueModel = {
    id: "1",
    type: "youtube-video",
    playedCount: 1,
    youtubeVideoId: "1",
    playlistId: "1",
    youtubeVideo: {
        id: "1",
        youtubeId: "asddwasdw",
        title: "asddwasdw",
        channelTitle: "asddwasdw",
        description: "asddwasdw",
        thumbnail: "https://i.ytimg.com/vi/q6H3rxUA40Q/mqdefault.jpg",
        duration: 60,
    },
    spotifyTrackId: "1",
    spotifyTrack: {
        id: "1",
        spotifyUri: "asddwasdw",
        title: "asddwasdw",
        artist: "asddwasdw",
        thumbnail: "https://i.ytimg.com/vi/q6H3rxUA40Q/mqdefault.jpg",
        duration: 60,
        createdAt: "asddwasdw",
    }
}

export type QueueServiceAPIGetAll = {
    queues: QueueModel[]
}

export interface ReOrderQueuePayload {
    queues: {
        queueId: string;
        order: number;
    }[]
}

// export type 

export type QueueServiceAPI = {
    getAll: (playlistId: string) => Promise<AxiosResponse<ListAPIResponse<QueueModel[]>>>
    addYoutubeVideo: (playlistId: string, videoId: string) => Promise<AxiosResponse<QueueModel>>
    clear: (playlistId: string) => Promise<AxiosResponse<null>>
    countUp: (queueId: string) => Promise<AxiosResponse<QueueModel>> // ****
    get: (queueId: string) => Promise<AxiosResponse<QueueModel>>
    remove: (queueId: string) => Promise<AxiosResponse<null>>
    reOrder: (playlistId: string, payload: ReOrderQueuePayload) => Promise<AxiosResponse<QueueModel[]>>
}