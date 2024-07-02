import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import YoutubeQueueInput from "./YoutubeQueueInput";
import AddQueueCardGroup from "./AddQueueCardGroup";
import { YoutubeBaseAttributes, YoutubeBaseAttributesDummy } from "@/types/apis/YoutubeSearch.api";

const SearchVideoDialog = ({
	open=false,
	searchVideos=[],
	children,
}:{
	open?:boolean
	searchVideos?: YoutubeBaseAttributes[];
	children: React.ReactNode
}) => {
	return (
		<Dialog>
			<DialogTrigger>
				{children}
			</DialogTrigger>
			<DialogContent className="max-w-[800px]">
				<YoutubeQueueInput />
				<AddQueueCardGroup
					searchVideos={searchVideos}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default SearchVideoDialog;
