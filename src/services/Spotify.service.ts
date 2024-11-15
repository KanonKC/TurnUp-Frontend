import { SpotifyAuthorization } from "@/types/apis/Spotify.api";
import { generateRandomString } from "@/util/RandomString";
import axios, { AxiosResponse } from "axios";
import { Buffer } from "buffer";

const { VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_CLIENT_SECRET } = import.meta.env;

const scopes = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
];

// const spotifyAPI = axios.create({
// 	baseURL: "https://api.spotify.com/v1",
// });

export function createSpotifyOAuthUrl() {
	const randomString = generateRandomString(16);
	return `https://accounts.spotify.com/authorize?response_type=code&client_id=${VITE_SPOTIFY_CLIENT_ID}&scope=${scopes.join(
		"%20"
	)}&redirect_uri=${
		window.location.origin
	}/spotify/callback&state=${randomString}`;
}

export async function getSpotifyUserLoginAccessToken(
	code: string
): Promise<AxiosResponse<SpotifyAuthorization>> {

	const authOptions = {
		url: "https://accounts.spotify.com/api/token",
		form: {
			code: code,
			redirect_uri: `${window.location.origin}/spotify/callback`,
			grant_type: "authorization_code",
		},
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization:
				"Basic " +
				Buffer.from(
					VITE_SPOTIFY_CLIENT_ID + ":" + VITE_SPOTIFY_CLIENT_SECRET
				).toString("base64"),
		},
		json: true,
	};

	return axios.post(authOptions.url, authOptions.form, {
		headers: authOptions.headers,
	});
}
