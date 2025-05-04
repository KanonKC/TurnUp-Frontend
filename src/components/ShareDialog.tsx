import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { useAppSelector } from "@/stores/hooks";
import { Separator } from "./ui/separator";

const ShareDialog = ({ children }: { children: ReactNode }) => {
	const playlist = useAppSelector((state) => state.playlist);
	const handleOnClick = () => {
		navigator.clipboard.writeText(window.location.href);
	};
	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent>
				<DialogTitle>Share this Lobby</DialogTitle>
				<div className="flex justify-center mt-8">
					<img
						className="hidden sm:block"
						src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${window.location.origin}/${playlist.id}`}
						alt={`turnup_qr_${playlist.id}`}
					/>
					<img
						className="sm:hidden"
						src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${window.location.origin}/${playlist.id}`}
						alt={`turnup_qr_${playlist.id}`}
					/>
				</div>
				<div className="flex items-center justify-center gap-2">
					<Separator className="w-[45%]" />
					<div className="text-xs">OR</div>
					<Separator className="w-[45%]" />
				</div>
				<Input
					onClick={handleOnClick}
					className="cursor-pointer"
					readOnly
					value={window.location.href}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default ShareDialog;
