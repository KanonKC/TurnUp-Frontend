export type YoutubeSearchRecognizerResult = {
    type: 'VIDEO' | 'PLAYLIST' | 'SEARCH',
    id: string
}

export type YTDLPDownloadedMetadata = {
	id: string,
	title: string,
	duration: number,
}

export type YoutubeServiceInterface = {
    extractURL: (url:string) => string,
    extractPlaylistURL: (url:string) => string,
    searchRecognizer: (input: string) => YoutubeSearchRecognizerResult | undefined
}