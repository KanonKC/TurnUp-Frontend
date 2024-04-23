import { AxiosResponse } from "axios"

export type QueueVideoMetadata = {
    queue_id: number
    played_count: number
    video_id: number
    playlist_id: number
    video: {
        video_id: number
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

export type QueueServiceAPIGetAll = {
    queues: QueueVideoMetadata[]
}

// export type 

export type QueueServiceAPI = {
    getAll: (playlistId: string) => Promise<AxiosResponse<QueueServiceAPIGetAll>>
    addVideo: (playlistId: string, videoId: string) => Promise<AxiosResponse<QueueVideoMetadata>>
    clear: (playlistId: string) => null
    countUp: (queueId: string) => Promise<AxiosResponse<QueueVideoMetadata>> // ****
    get: (queueId: string) => Promise<AxiosResponse<QueueVideoMetadata>>
    remove: (queueId: string) => null
}