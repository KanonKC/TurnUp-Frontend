import React, { useEffect, useState } from "react";
import CenterContainer from "./CenterContainer";
import { useParams } from "react-router-dom";
import { PlaylistService } from "@/services/apis/Playlist.service";
import { MonitorX } from "lucide-react";
import { pushVisitedPlaylistIds } from "@/util/LocalStorage";

const ValidLobbyContainer = ({
    children
}: {
    children: React.ReactNode
}) => {
    
    const { playlistId } = useParams();
    const [isExisted, setIsExisted] = useState<boolean | undefined>(undefined);

    useEffect(() => {

        if (!playlistId) return;

        pushVisitedPlaylistIds(playlistId)
        document.title = `${playlistId} | Turn up`

        PlaylistService.get(playlistId).then(response => {
            if (response.status === 200) {
                setIsExisted(true);
            }
        }).catch((error) => {
            if (error.response.status === 404) {
                setIsExisted(false);
            }
        })
    },[playlistId])

	return (
        isExisted === undefined ? <div></div> :
        !isExisted ? (
            <CenterContainer>
                <div className="flex justify-center"><MonitorX size={180}/></div>
                <div className="text-2xl">Room doesn't exist</div>
                <div className="text-2xl text-center text-gray-400">{playlistId}</div>
            </CenterContainer>
        ) : (
            <>{children}</>
        )
    );
};

export default ValidLobbyContainer;
