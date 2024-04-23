import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
	return (
		<div>
			<h1 className="text-6xl text-center themed-color">
				TURN UP THE MUSIC
			</h1>
      <div className="flex">
			<div className="themed-border">
				<ReactPlayer
					light={true}
					controls
					playing
					url="https://www.youtube.com/watch?v=ESaJdXc5QQ8"
				/>
			</div>
      </div>
		</div>
	);
};

export default VideoPlayer;
