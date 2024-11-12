import { AxiosResponse } from "axios";
import { QueueVideoMetadata } from "./Queue.api";

export interface PlaylistModel {
    id: string;
    type: string;
    firstQueueId: string | null;
    currentQueueId: string | null;
    currentQueue: QueueVideoMetadata | null;
    lastQueueId: string | null;
    createdAt: Date;
}

export interface PlaylistModelWithCurrentVideo extends PlaylistModel {
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
    } | null;
}

export type PlaylistServiceAPI = {
    create: (playlistId: string) => Promise<AxiosResponse<PlaylistModel>>
    get: (playlistId: string) => Promise<AxiosResponse<PlaylistModelWithCurrentVideo>>
    play: {
        index: (playlistId: string,index: number) => Promise<AxiosResponse<PlaylistModel>>
        queue: (playlistId: string,queueId: string) => Promise<AxiosResponse<PlaylistModel>>
        next: (playlistId: string) => Promise<AxiosResponse<PlaylistModel>>
        previous: (playlistId: string) => Promise<AxiosResponse<PlaylistModel>>
        algorithm: (playlistId: string) => Promise<AxiosResponse<PlaylistModel>>
    }
}