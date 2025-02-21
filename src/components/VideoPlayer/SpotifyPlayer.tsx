import { formatTime } from "@/services/FormatTime.service";
import { seekSpotifyPlayerToPosition } from "@/services/Spotify.service";
import { PlaylistService } from "@/services/apis/Playlist.service";
import socket from "@/socket";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setCurrentTimeMs, setIsPlaying } from "@/stores/slices/playlistSlice";
import { useEffect, useState } from "react";
import SpotifyPlayer, { CallbackState, spotifyApi } from "react-spotify-web-playback";
import { Slider } from "../ui/slider";

const CustomSpotifyPlayer = () => {

	const playlist = useAppSelector((state) => state.playlist);

	const [spotifyPlayer, setSpotifyPlayer] = useState<CallbackState | null>(
		null
	);

	const isPlaying = useAppSelector((state) => state.playlist.isPlaying);

	const currentTimeMs = useAppSelector((state) => state.playlist.currentTimeMs);
	const dispatch = useAppDispatch();

	// useEffect(() => {
	//     if (timer) {
	//         clearInterval(timer);
	//         setTimer(null);
	//     }
	//     if (isPlaying && !timer) {
	//         console.log("setInterval", timer);
	//         const task = setInterval(() => {
	//             setcurrentTimeMs(currentTimeMs + 1);
	//         }, 1000);
	//         setTimer(task);
	//     }
	// }, [isPlaying, currentTimeMs, timer]);

    const seekToPosition = async (positionS: number) => {
        if (!playlist.owner?.spotifyAccessToken) return;
        await seekSpotifyPlayerToPosition(playlist.owner.spotifyAccessToken, positionS * 1000);
        dispatch(setCurrentTimeMs(positionS));
    };

    const togglePause = () => {
        console.log("togglePause", isPlaying);
        dispatch(setIsPlaying(false));
    }

    useEffect(() => {
        if (!playlist.currentQueue || !playlist.currentQueue.spotifyTrack) return;
        // console.log("currentTimeMs", currentTimeMs, playlist.currentQueue.spotifyTrack.duration * 1000);
        if (currentTimeMs >= playlist.currentQueue.spotifyTrack.duration * 1000) {
            dispatch(setIsPlaying(false));
            PlaylistService.play.next(playlist.id);
            socket.emit("reloadQueuesInPlaylist", playlist.id);
        }
    }, [currentTimeMs, dispatch, playlist.currentQueue, playlist.id]);

	useEffect(() => {
		if (spotifyPlayer?.status === "READY") {
			dispatch(setCurrentTimeMs(spotifyPlayer.progressMs));
			dispatch(setIsPlaying(true));
		}
	}, [spotifyPlayer, dispatch]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (isPlaying) {
				dispatch(setCurrentTimeMs(currentTimeMs + 100));
			}
		}, 100);

		return () => clearInterval(interval);
	}, [dispatch, currentTimeMs, isPlaying, spotifyPlayer]);


	return (
		playlist.owner?.spotifyAccessToken &&
		playlist.currentQueue?.type === "spotify-track" &&
		playlist.currentQueue.spotifyTrack && (
			<div>
				<div className="themed-border">
					<img
						onClick={togglePause}
						src={playlist.currentQueue.spotifyTrack.thumbnail}
						width={400}
						alt="album"
					/>
					<div className="">
						<SpotifyPlayer
							token={playlist.owner.spotifyAccessToken}
							uris={playlist.currentQueue.spotifyTrack.spotifyUri}
							callback={(e) => setSpotifyPlayer(e)}
							play={isPlaying}
                            hideCoverArt
                            hideAttribution
                            layout="responsive"
						/>
					</div>
				</div>
				<Slider
					step={1}
					min={0}
					value={[currentTimeMs]}
					onValueChange={(value) => seekToPosition(value[0])}
					max={playlist.currentQueue.spotifyTrack.duration * 1000}
				/>
				<div>{formatTime(Math.floor(currentTimeMs/1000))}</div>
			</div>
		)
	);
};

export default CustomSpotifyPlayer;
