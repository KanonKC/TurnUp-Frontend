import React, { useCallback, useEffect, useState } from "react";
import CenterContainer from "./CenterContainer";
import { useParams } from "react-router-dom";
import { PlaylistService } from "@/services/apis/Playlist.service";
import { MonitorX } from "lucide-react";
import { pushVisitedPlaylistIds } from "@/util/LocalStorage";
import { useAppDispatch } from "@/stores/hooks";
import { getPlaylistById } from "@/stores/slices/playlistSlice";
import socket from "@/socket";

const ValidLobbyContainer = ({
    children
}: {
    children: React.ReactNode
}) => {
    
    const { playlistId } = useParams();
    const [isExisted, setIsExisted] = useState<boolean | undefined>(undefined);

    useEffect(() => {

        if (!playlistId) return;

        PlaylistService.get(playlistId).then(response => {
            if (response.status === 200) {
                setIsExisted(true);
                pushVisitedPlaylistIds(playlistId)
                document.title = `${playlistId} | Turn up`
            }
        }).catch((error) => {
            if (error.response.status === 404) {
                setIsExisted(false);
                document.title = "Invalid room | Turn up"
            }
        })
    },[playlistId])

    const dispatch = useAppDispatch();


	const load = useCallback(async () => {
		if (!playlistId) return;
		await getPlaylistById(dispatch, playlistId);
	}, [dispatch, playlistId]);

	useEffect(() => {
		load();

		socket.on("reloadQueuesInPlaylist", (socketPlaylistId: string) => {
			if (socketPlaylistId === playlistId) {
				load();
			}
		});

		return () => {
			socket.off("reloadQueuesInPlaylist");
		};
	}, [load, playlistId]);

	return (
        isExisted === undefined ? <div></div> :
        !isExisted ? (
            <CenterContainer>
                <div className="flex justify-center"><MonitorX size={180}/></div>
                <div className="text-2xl">Room doesn't exist</div>
                <div className="text-2xl text-center text-neutral-400">{playlistId}</div>
            </CenterContainer>
        ) : (
            <>{children}</>
        )
    );
};

export default ValidLobbyContainer;
