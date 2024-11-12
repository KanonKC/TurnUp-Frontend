import { PlaylistModel, PlaylistModelWithCurrentVideo, PlaylistServiceAPI } from "@/types/apis/Playlist.api";
import axios from "axios";
import { BACKEND_URL } from "./BackendURL";

export const PlaylistService: PlaylistServiceAPI = {
    create(playlistId: string){
        return axios.post<PlaylistModel>(`${BACKEND_URL}/playlists`,{id: playlistId})
    },
    
    get(playlistId){
        return axios.get<PlaylistModelWithCurrentVideo>(`${BACKEND_URL}/playlists/${playlistId}`)
    },
    
    play: {
        index(playlistId,index){
            return axios.put<PlaylistModel>(`${BACKEND_URL}/playlists/${playlistId}/play/index/${index}`)
        },

        queue(playlistId, queueId) {
            return axios.put<PlaylistModel>(`${BACKEND_URL}/playlists/${playlistId}/play/queues/${queueId}`)
        },
        
        next(playlistId){
            return axios.put<PlaylistModel>(`${BACKEND_URL}/playlists/${playlistId}/play/next`)
        },
        
        previous(playlistId){
            return axios.put<PlaylistModel>(`${BACKEND_URL}/playlists/${playlistId}/play/prev`)
        },
        
        algorithm(playlistId){
            return axios.put<PlaylistModel>(`${BACKEND_URL}/playlists/${playlistId}/play/algorithm`)
        }
    }
}