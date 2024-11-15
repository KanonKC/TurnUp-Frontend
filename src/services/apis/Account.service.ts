import { AccountModel } from "@/types/apis/Account.api"
import { backendUrl } from "./BackendURL"
import { SpotifyAuthorization } from "@/types/apis/Spotify.api"

export async function registerOrLoginBySpotify(payload: SpotifyAuthorization) {
    return backendUrl.post<AccountModel>('/accounts/spotify', payload)
}

export async function getAccountBySpotifyAccessToken(accessToken: string) {
    return backendUrl.get<AccountModel>('/accounts/spotify', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}