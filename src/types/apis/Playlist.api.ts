import { AxiosResponse } from "axios";

export interface PlaylistModel {
    id: string;
    type: string;
    currentIndex: number | null;
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
        next: (playlistId: string) => Promise<AxiosResponse<PlaylistModel>>
        previous: (playlistId: string) => Promise<AxiosResponse<PlaylistModel>>
        algorithm: (playlistId: string) => Promise<AxiosResponse<PlaylistModel>>
    }
}