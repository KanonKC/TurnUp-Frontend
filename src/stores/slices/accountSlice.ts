import { getAccountBySpotifyAccessToken } from "@/services/apis/Account.service";
import { AccountModel } from "@/types/apis/Account.api";
import {
	createSlice,
	PayloadAction,
	ThunkDispatch,
	UnknownAction,
} from "@reduxjs/toolkit";

export interface AccountState {
	id: string;
	username: string;
	spotifyId: string | null;
	spotifyAccessToken: string | null;
	spotifyRefreshToken: string | null;
	spotifyTokenExpiresAt: Date | null;
}

export const initialState: AccountState = {
	id: "",
	username: "",
	spotifyId: null,
	spotifyAccessToken: null,
	spotifyRefreshToken: null,
	spotifyTokenExpiresAt: null,
};

export const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		setAccountState: (
			state: AccountState,
			action: PayloadAction<AccountModel>
		) => {
			state.id = action.payload.id;
			state.username = action.payload.username;
			state.spotifyId = action.payload.spotifyId;
			state.spotifyAccessToken = action.payload.spotifyAccessToken;
			state.spotifyRefreshToken = action.payload.spotifyRefreshToken;
			state.spotifyTokenExpiresAt = action.payload.spotifyTokenExpiresAt;
		},
	},
});

export const { setAccountState } = accountSlice.actions;

export async function loadAccountState(
	dispatch: ThunkDispatch<
		{
			state: AccountState;
		},
		undefined,
		UnknownAction
	>,
	accessToken: string
) {
    try {
        const { data: account } = await getAccountBySpotifyAccessToken(accessToken);
        dispatch(setAccountState(account));
    } catch (error) {
        // Handle error
    }
}
