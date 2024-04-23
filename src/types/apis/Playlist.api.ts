import { AxiosResponse } from "axios";

export type PlaylistModel = {
    playlist_id: string;
    current_index: number | null;
}

export type PlaylistServiceAPI = {
    create: () => Promise<AxiosResponse<PlaylistModel>>
    get: (playlistId: string) => Promise<AxiosResponse<PlaylistModel>>
    play: {
        index: (playlistId: string,index: number) => Promise<AxiosResponse<PlaylistModel>>
        next: (playlistId: string) => Promise<AxiosResponse<PlaylistModel>>
        previous: (playlistId: string) => Promise<AxiosResponse<PlaylistModel>>
        algorithm: (playlistId: string) => Promise<AxiosResponse<PlaylistModel>>
    }
}