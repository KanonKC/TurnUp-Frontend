import axios from "axios";
import { BACKEND_URL } from "./BackendURL";
import { QueueServiceAPI, QueueServiceAPIGetAll, QueueVideoMetadata } from "@/types/apis/Queue.api";

export const QueueService: QueueServiceAPI = {
    getAll(playlistId){
        return axios.get<QueueServiceAPIGetAll>(`${BACKEND_URL}/api/playlists/${playlistId}/queues`)
    },
    
    addVideo(playlistId,url){
        console.log(playlistId,url)
        return axios.post<QueueVideoMetadata>(`${BACKEND_URL}/api/playlists/${playlistId}/queues`,{youtube_id: url})
    },
    
    clear(playlistId){
        return axios.delete<null>(`${BACKEND_URL}/api/playlists/${playlistId}/queues`)
    },
    
    countUp(queueId){
        return axios.put<QueueVideoMetadata>(`${BACKEND_URL}/api/queues/${queueId}/increment`)
    },
    
    get(queueId){
        return axios.delete<QueueVideoMetadata>(`${BACKEND_URL}/api/queues/${queueId}`)
    },
    
    remove(queueId){
        return axios.delete<null>(`${BACKEND_URL}/api/queues/${queueId}`)
    }
    
}