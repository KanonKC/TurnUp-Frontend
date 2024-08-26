import { AxiosResponse } from "axios"
import { ListAPIResponse } from "../ListAPI"

export type QueueVideoMetadata = {
    id: string
    playedCount: number
    youtubeVideoId: string
    playlistId: string
    youtubeVideo: {
        id: string
        youtubeId: string
        title: string
        channelTitle: string
        description: string
        thumbnail: string
        duration: number
        isCleared: boolean
        totalPlayed: number
    }
}

export const QueueVideoMetadataDummy:QueueVideoMetadata = {
    id: "1",
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
        isCleared: false,
        totalPlayed: 5
    }
}

export type QueueServiceAPIGetAll = {
    queues: QueueVideoMetadata[]
}

// export type 

export type QueueServiceAPI = {
    getAll: (playlistId: string) => Promise<AxiosResponse<ListAPIResponse<QueueVideoMetadata[]>>>
    addVideo: (playlistId: string, videoId: string) => Promise<AxiosResponse<QueueVideoMetadata>>
    clear: (playlistId: string) => Promise<AxiosResponse<null>>
    countUp: (queueId: string) => Promise<AxiosResponse<QueueVideoMetadata>> // ****
    get: (queueId: string) => Promise<AxiosResponse<QueueVideoMetadata>>
    remove: (queueId: string) => Promise<AxiosResponse<null>>
}