import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import CenterContainer from "@/layouts/CenterContainer";
import { PlaylistService } from "@/services/apis/Playlist.service";
import { Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinLobby = () => {
	const [roomCode, setRoomCode] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isNotFound, setIsNotFound] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e: string) => {
		setRoomCode(e);
	};

	const resolveRoomCode = useCallback(async () => {
		setIsLoading(true);
		setIsNotFound(false);
		PlaylistService.get(roomCode)
			.then(() => {
				setIsLoading(false);
				navigate(`/${roomCode}`);
			})
			.catch(() => {
				setIsLoading(false);
				setIsNotFound(true);
			});
	}, [roomCode, navigate]);

	return (
		<CenterContainer>
			<div className="mx-10 md:mx-0">
				<div className="font-bold text-xl ">Enter Room Code</div>
				<div className="hidden md:block">
					<div className="text-neutral-400 text-base">
						You may ask your friend to share thier room code,
					</div>
					<div className="text-neutral-400 text-base">
						or you can scan QR code with your phone instead.
					</div>
				</div>
				<div className="md:hidden">
					<div className="text-neutral-400 text-base">
						You may ask your friend to share thier room code, or you
						can scan QR code with your phone instead.
					</div>
				</div>

				<div className="mt-5 flex justify-center md:justify-start w-full">
					<InputOTP
						onComplete={resolveRoomCode}
						onChange={(e) => handleChange(e)}
						value={roomCode}
						maxLength={6}
					>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
					</InputOTP>
				</div>

				<div className="flex justify-center md:justify-start mt-5 items-center gap-5">
					<Button
						disabled={roomCode.length !== 6 || isLoading}
						onClick={resolveRoomCode}
					>
						{isLoading && <Loader2 className="animate-spin mr-2" />}
						Join Lobby
					</Button>
					{isNotFound && (
						<span className="text-red-400">Room not found.</span>
					)}
				</div>
			</div>
		</CenterContainer>
	);
};

export default JoinLobby;
