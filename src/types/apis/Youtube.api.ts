export type YoutubeThumbnailMetadata = {
    url: string;
    width: number;
    height: number;
}

export type YoutubeVideoID = {
    kind: string;
    videoId: string;
}

export type YoutubeThumbnail = {
    default?: YoutubeThumbnailMetadata;
    medium?: YoutubeThumbnailMetadata;
    high?: YoutubeThumbnailMetadata;
}

export type YoutubeQuerySearchResult = {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: YoutubeThumbnail;
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
    id: YoutubeVideoID;
}

export type YoutubePlaylistSearchResult = {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: YoutubeThumbnail;
    channelTitle: string;
    playlistId: string;
    position: string;
    resourceId: YoutubeVideoID;
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
    id: string;
}