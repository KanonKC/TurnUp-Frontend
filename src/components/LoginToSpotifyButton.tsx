import { createSpotifyOAuthUrl } from "@/services/Spotify.service";
import { Button } from "./ui/button";

const LoginToSpotifyButton = () => {
	const handleOnClickLoginButton = () => {
		const url = createSpotifyOAuthUrl();
		window.location.href = url;
	};

	return <Button onClick={handleOnClickLoginButton}>Login to Spotify</Button>;
};

export default LoginToSpotifyButton;
