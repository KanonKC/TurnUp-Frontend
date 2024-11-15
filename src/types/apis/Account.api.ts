export interface AccountModel {
    id: string;
    username: string;
    spotifyId: string | null;
    spotifyAccessToken: string | null;
    spotifyRefreshToken: string | null;
    spotifyTokenExpiresAt: Date | null;
    createdAt: Date;
}