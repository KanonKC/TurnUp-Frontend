import { PlaylistModel, PlaylistServiceAPI } from "@/types/apis/Playlist.api";
import axios from "axios";
import { BACKEND_URL } from "./BackendURL";

export const PlaylistService: PlaylistServiceAPI = {
    create(){
        return axios.post<PlaylistModel>(`${BACKEND_URL}/api/playlists`)
    },
    
    get(playlistId){
        return axios.get<PlaylistModel>(`${BACKEND_URL}/api/playlists/${playlistId}`)
    },
    
    play: {
        index(playlistId,index){
            return axios.put<PlaylistModel>(`${BACKEND_URL}/api/playlists/${playlistId}/play/index/${index}`)
        },
        
        next(playlistId){
            return axios.put<PlaylistModel>(`${BACKEND_URL}/api/playlists/${playlistId}/play/next`)
        },
        
        previous(playlistId){
            return axios.put<PlaylistModel>(`${BACKEND_URL}/api/playlists/${playlistId}/play/prev`)
        },
        
        algorithm(playlistId){
            return axios.put<PlaylistModel>(`${BACKEND_URL}/api/playlists/${playlistId}/play/algorithm`)
        }
    }
}