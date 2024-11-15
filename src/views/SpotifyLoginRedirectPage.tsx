import { registerOrLoginBySpotify } from "@/services/apis/Account.service";
import { getSpotifyUserLoginAccessToken } from "@/services/Spotify.service";
import { useEffect } from "react";

const SpotifyLoginRedirectPage = () => {
	const spotifyAuthorize = async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");

		if (code) {
			const { data: auth } = await getSpotifyUserLoginAccessToken(code);

			const { data: account } = await registerOrLoginBySpotify(auth);

            if (!account.spotifyAccessToken) return;

			localStorage.setItem(
				"spotifyAccessToken",
				account.spotifyAccessToken
			);

			window.location.href = "/";
		}
	};

	useEffect(() => {
		spotifyAuthorize();
	}, []);

	return <div>SpotifyLoginRedirectPage</div>;
};

export default SpotifyLoginRedirectPage;
