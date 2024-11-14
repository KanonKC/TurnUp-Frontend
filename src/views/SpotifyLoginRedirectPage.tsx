import { getSpotifyUserLoginAccessToken } from "@/services/Spotify.service";
import { useEffect } from "react";

const SpotifyLoginRedirectPage = () => {
	const spotifyAuthorize = async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");

		if (code) {
			const authResponse = await getSpotifyUserLoginAccessToken(code);
            console.log('login success', authResponse.data);



			// const userResponse = await getTwitchUserByAccessToken(
			// 	authResponse.data.access_token
			// );

			// const user = userResponse.data.data[0];
			// const tokenExpiresAt = new Date(
			// 	new Date().getTime() + authResponse.data.expires_in * 1000
			// );

			// localStorage.setItem("username", user.display_name);
			// localStorage.setItem("twitchId", user.id);
			localStorage.setItem(
				"spotifyAccessToken",
				authResponse.data.access_token
			);
			// localStorage.setItem(
			// 	"twitchRefreshToken",
			// 	authResponse.data.refresh_token
			// );
			// localStorage.setItem(
			// 	"twitchTokenExpiresAt",
			// 	tokenExpiresAt.getTime().toString()
			// );

			window.location.href = "/";
		}
	};

	useEffect(() => {
		spotifyAuthorize();
	}, []);

	return <div>SpotifyLoginRedirectPage</div>;
};

export default SpotifyLoginRedirectPage;
