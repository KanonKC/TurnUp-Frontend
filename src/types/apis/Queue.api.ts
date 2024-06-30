import { AxiosResponse } from "axios"
import { ListAPIResponse } from "../ListAPI"

export type QueueVideoMetadata = {
    id: string
    played_count: number
    video_id: string
    playlist_id: string
    video: {
        id: string
        youtube_id: string
        title: string
        channel_title: string
        description: string
        thumbnail: string
        duration: number
        is_cleared: boolean
        total_played: number
    }
}

export const QueueVideoMetadataDummy:QueueVideoMetadata = {
    id: "1",
    played_count: 1,
    video_id: "1",
    playlist_id: "1",
    video: {
        id: "1",
        youtube_id: "asddwasdw",
        title: "asddwasdw",
        channel_title: "asddwasdw",
        description: "asddwasdw",
        thumbnail: "https://i.ytimg.com/vi/q6H3rxUA40Q/mqdefault.jpg",
        duration: 60,
        is_cleared: false,
        total_played: 5
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