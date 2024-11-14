import { PlaylistService } from "@/services/apis/Playlist.service";
import { PlaylistModel } from "@/types/apis/Playlist.api";
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
    isLoading: boolean;
}

export const initialState: PlaylistState = {
	id: "",
	type: "",
	currentQueueId: null,
	currentQueue: null,
	queues: [],
    isLoading: false,
};

export const playlistSlice = createSlice({
	name: "playlist",
	initialState,
	reducers: {
		setPlaylistState: (
			state: PlaylistState,
			action: PayloadAction<PlaylistModel>
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
        setIsLoading: (
            state: PlaylistState,
            action: PayloadAction<boolean>
        ) => {
            state.isLoading = action.payload;
        }
	},
});

export const { setPlaylistState, setQueues, setIsLoading } = playlistSlice.actions;

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
