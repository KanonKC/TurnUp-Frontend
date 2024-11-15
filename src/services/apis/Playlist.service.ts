import { PlaylistModel, PlaylistServiceAPI } from "@/types/apis/Playlist.api";
import axios from "axios";
import { BACKEND_URL } from "./BackendURL";
import { CreatePlaylistPayload } from "@/types/apis/Playlist.api";

export const PlaylistService: PlaylistServiceAPI = {
    create(payload: CreatePlaylistPayload){
        return axios.post<PlaylistModel>(`${BACKEND_URL}/playlists`, payload)
    },
    
    get(playlistId){
        return axios.get<PlaylistModel>(`${BACKEND_URL}/playlists/${playlistId}`)
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