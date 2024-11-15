import { AxiosResponse } from "axios";
import { QueueModel } from "./Queue.api";

export interface PlaylistModel {
    id: string;
    type: string;
    currentQueueId: string | null;
    currentQueue: QueueModel | null;
    queues: QueueModel[];
    createdAt: Date;
}

export type PlaylistServiceAPI = {
    create: (playlistId: string) => Promise<AxiosResponse<PlaylistModel>>
    get: (playlistId: string) => Promise<AxiosResponse<PlaylistModel>>
    play: {
        index: (playlistId: string,index: number) => Promise<AxiosResponse<PlaylistModel>>
        queue: (playlistId: string,queueId: string) => Promise<AxiosResponse<PlaylistModel>>
        next: (playlistId: string) => Promise<AxiosResponse<PlaylistModel>>
        previous: (playlistId: string) => Promise<AxiosResponse<PlaylistModel>>
        algorithm: (playlistId: string) => Promise<AxiosResponse<PlaylistModel>>
    }
}