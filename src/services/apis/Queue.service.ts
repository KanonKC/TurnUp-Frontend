import axios from "axios";
import { BACKEND_URL } from "./BackendURL";
import { QueueServiceAPI, QueueServiceAPIGetAll, QueueVideoMetadata } from "@/types/apis/Queue.api";
import { ListAPIResponse } from "@/types/ListAPI";

export const QueueService: QueueServiceAPI = {
    getAll(playlistId){
        return axios.get<ListAPIResponse<QueueVideoMetadata[]>>(`${BACKEND_URL}/playlists/${playlistId}/queues`)
    },
    
    addVideo(playlistId,url){
        return axios.post<QueueVideoMetadata>(`${BACKEND_URL}/playlists/${playlistId}/queues`,{videoId: url})
    },
    
    clear(playlistId){
        return axios.delete<null>(`${BACKEND_URL}/playlists/${playlistId}/queues`)
    },
    
    countUp(queueId){
        return axios.put<QueueVideoMetadata>(`${BACKEND_URL}/queues/${queueId}/increment`)
    },
    
    get(queueId){
        return axios.delete<QueueVideoMetadata>(`${BACKEND_URL}/queues/${queueId}`)
    },
    
    remove(queueId){
        return axios.delete<null>(`${BACKEND_URL}/queues/${queueId}`)
    }
    
}