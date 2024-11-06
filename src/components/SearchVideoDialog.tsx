import { YoutubeBaseAttributes } from "@/types/apis/YoutubeSearch.api";
import React from "react";
import AddQueueCardGroup from "./AddQueueCardGroup";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import YoutubeQueueInput from "./YoutubeQueueInput";

const SearchVideoDialog = ({
	// open=false,
	searchVideos = [],
	children,
}: {
	// open?:boolean
	searchVideos?: YoutubeBaseAttributes[];
	children: React.ReactNode;
}) => {
	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent className="max-w-[800px]">
				<div className="mt-[24px]">
					<YoutubeQueueInput />
				</div>
				<AddQueueCardGroup searchVideos={searchVideos} />
			</DialogContent>
		</Dialog>
	);
};

export default SearchVideoDialog;
