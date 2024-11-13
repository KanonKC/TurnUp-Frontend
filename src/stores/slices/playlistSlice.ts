import { PlaylistService } from "@/services/apis/Playlist.service";
import { QueueVideoMetadata } from "@/types/apis/Queue.api";
import {
	createSlice,
	PayloadAction,
	ThunkDispatch,
	UnknownAction,
} from "@reduxjs/toolkit";

export interface PlaylistState {
	id: string;
	type: string;
	currentQueueId: string | null;
	currentQueue: QueueVideoMetadata | null;
	queues: QueueVideoMetadata[];
}

export const initialState: PlaylistState = {
	id: "",
	type: "",
	currentQueueId: null,
	currentQueue: null,
	queues: [],
};

export const playlistSlice = createSlice({
	name: "playlist",
	initialState,
	reducers: {
		setPlaylistState: (
			state: PlaylistState,
			action: PayloadAction<PlaylistState>
		) => {
			state.currentQueue = action.payload.currentQueue;
			state.currentQueueId = action.payload.currentQueueId;
			state.id = action.payload.id;
			state.type = action.payload.type;
			state.queues = action.payload.queues;
		},
		setQueues: (
			state: PlaylistState,
			action: PayloadAction<QueueVideoMetadata[]>
		) => {
			state.queues = action.payload;
		},
	},
});

export const { setPlaylistState, setQueues } = playlistSlice.actions;

export async function getPlaylistById(
	dispatch: ThunkDispatch<
		{
			state: PlaylistState;
		},
		undefined,
		UnknownAction
	>,
	playlistId: string
) {
    if (!playlistId) return;
	const response = await PlaylistService.get(playlistId);
	dispatch(setPlaylistState(response.data));
}
