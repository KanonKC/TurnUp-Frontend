import { YoutubeServiceInterface } from "@/types/YoutubeServiceInterface";

export const YoutubeService: YoutubeServiceInterface = {
	extractURL(url) {
		if (url.includes("youtu.be")) {
			const url_div = url.split("youtu.be/");
			return url_div[1];
		} else {
			const url_div = url.split("?v=");
			if (url_div.length !== 1) {
				const query_div = url_div[1].split("&");
				return query_div[0];
			} else {
				return url_div[0];
			}
		}
	},

	extractPlaylistURL(url) {
		if (url.includes("youtube.com")) {
			const playlistReg = /list=.*&|list=.*/;
			if (!playlistReg.exec(url)) {
				return "";
			}
			const result = playlistReg.exec(url);

			if (!result) {
				return "";
			}

			let slicedResult = result[0].slice(5);

			if (slicedResult[slicedResult.length - 1] === "&") {
				slicedResult = slicedResult.slice(0, -1);
			}
			return slicedResult;
		} else {
			return url;
		}
	},

	searchRecognizer(input) {
		let result;
        let matchedResult;
		if (input.includes("youtu.be")) {
            return {
                type: "VIDEO",
                id: input.split("/")[3].split("?")[0]
            }
		} else if (input.includes("list=")) {
			const videoReg = /list=(.*?)&|list=(.*?)/;
			result = videoReg.exec(input);
            
            if (!result) {
                return
            }
            matchedResult = result[0]

			if (matchedResult[matchedResult.length - 1] === "&") {
                return {
                    type: "PLAYLIST",
                    id: matchedResult.slice(5, -1)
                }
			} else {
                return {
                    type: "PLAYLIST",
                    id: matchedResult.slice(5)
                }
			}
		} else if (input.includes("v=")) {
			const videoReg = /v=.*&|v=.*/;
			result = videoReg.exec(input);
            
            if (!result) {
                return
            }
            matchedResult = result[0]

			if (matchedResult[matchedResult.length - 1] === "&") {
                return {
                    type: "VIDEO",
                    id: matchedResult.slice(2, -1)
                }
			} else {
                return {
                    type: "VIDEO",
                    id: matchedResult.slice(2)
                }
			}
		} else {
			return {
                type: "SEARCH",
                id: input
            }
		}
	},
};