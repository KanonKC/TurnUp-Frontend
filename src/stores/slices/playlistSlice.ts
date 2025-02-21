import { PlaylistService } from "@/services/apis/Playlist.service";
import { AccountModel } from "@/types/apis/Account.api";
import { PlaylistModel } from "@/types/apis/Playlist.api";
import { QueueModel } from "@/types/apis/Queue.api";
import {
	createSlice,
	PayloadAction,
	ThunkDispatch,
	UnknownAction,
} from "@reduxjs/toolkit";

export interface PlaylistState {
	id: string;
	type: string;
	owner: AccountModel | null;
	currentQueueId: string | null;
	currentQueue: QueueModel | null;
	queues: QueueModel[];
	isLoading: boolean;
	isPlaying: boolean;
	currentTimeMs: number;
}

export const initialState: PlaylistState = {
	id: "",
	type: "",
	owner: null,
	currentQueueId: null,
	currentQueue: null,
	queues: [],
	isLoading: false,
	currentTimeMs: 0,
	isPlaying: false,
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
			state.owner = action.payload.owner;
		},
		setQueues: (
			state: PlaylistState,
			action: PayloadAction<QueueModel[]>
		) => {
			state.queues = action.payload;
		},
		setIsLoading: (
			state: PlaylistState,
			action: PayloadAction<boolean>
		) => {
			state.isLoading = action.payload;
		},
		setCurrentTimeMs: (
			state: PlaylistState,
			action: PayloadAction<number>
		) => {
			state.currentTimeMs = action.payload;
		},
		setIsPlaying: (
			state: PlaylistState,
			action: PayloadAction<boolean>
		) => {
			state.isPlaying = action.payload;
		},
	},
});

export const {
	setPlaylistState,
	setQueues,
	setIsLoading,
	setCurrentTimeMs,
	setIsPlaying,
} = playlistSlice.actions;

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
	console.log("playlist", response.data);
	dispatch(setPlaylistState(response.data));
}
