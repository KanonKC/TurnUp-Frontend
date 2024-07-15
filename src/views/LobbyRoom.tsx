import QueueCard from "@/components/QueueCard";
import QueueCardPlaylist from "@/components/QueueCardPlaylist";
import { Button } from "@/components/ui/button";
import YoutubeQueueInput from "@/components/YoutubeQueueInput";
import CenterContainer from "@/layouts/CenterContainer";
import ValidLobbyContainer from "@/layouts/ValidLobbyContainer";
import { PlaylistService } from "@/services/apis/Playlist.service";
import { QueueService } from "@/services/apis/Queue.service";
import socket from "@/socket";
import { PlaylistModel } from "@/types/apis/Playlist.api";
import { QueueVideoMetadata } from "@/types/apis/Queue.api";
import { MonitorPlay } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LobbyRoom = () => {

    const [queues, setQueues] = useState<QueueVideoMetadata[]>([]);
	const [nowPlaying, setnowPlaying] = useState<PlaylistModel>();

	const { playlistId } = useParams();

    const navigate = useNavigate();

    const load = () => {

		if (!playlistId) return;

		QueueService.getAll(playlistId)
			.then((response) => {
				setQueues(response.data.data);
				return PlaylistService.get(playlistId);
			})
			.then((response) => {
				console.log("RESPONSE", response.data);
				setnowPlaying(response.data);
			});
	};

    useEffect(() => {
		load();

		socket.on("reloadQueuesInPlaylist", (socketPlaylistId: string) => {
			if (socketPlaylistId === playlistId) {
				load();
			}
		})

		return () => {
			socket.off("reloadQueuesInPlaylist");
		}
	}, []);
    
    return (
        <ValidLobbyContainer>
            <CenterContainer>

                <Button onClick={() => navigate("./player")} className="absolute right-5 top-5">Go to Player Room

                    <MonitorPlay size={20} className="ml-2" />
                </Button>
                <div className="my-5">
                    <h1 className="text-6xl text-center themed-color tracking-widest">
                        {playlistId}
                    </h1>
                </div>
                <div>
                    <YoutubeQueueInput />
                </div>

                <div className="my-3">
                    <div className="font-bold mb-1">NOW PLAYING</div>
                    <div className="now-playing-border">
                    <QueueCard 
                        queueVideoMetadata={queues[nowPlaying?.current_index || 0]}
                        readOnly
                        variant="ROUND"
                        />
                    </div>
                </div>
                
                <div className="font-bold mb-1">QUEUE</div>
                <QueueCardPlaylist
                    readOnly
                    queues={queues}
                    nowPlaying={nowPlaying}
                />
            </CenterContainer>
        </ValidLobbyContainer>
    )
}

export default LobbyRoom