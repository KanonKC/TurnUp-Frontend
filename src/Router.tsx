import { Route, Routes } from 'react-router-dom'
import CreateLobby from './views/CreateLobby'
import Home from './views/Home'
import JoinLobby from './views/JoinLobby'
import LobbyRoom from './views/LobbyRoom'
import VideoPlayer from './views/PlayerRoom'
import SpotifyLoginRedirectPage from './views/SpotifyLoginRedirectPage'
import { useEffect } from 'react'
import { loadAccountState } from './stores/slices/accountSlice'
import { useAppDispatch } from './stores/hooks'

const Router = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {

        const spotifyAccessToken = localStorage.getItem('spotifyAccessToken')

        if (!spotifyAccessToken) return

        loadAccountState(dispatch, spotifyAccessToken)

    }, [dispatch])

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            {/* <Route path="/player" element={<VideoPlayer/>}/> */}
            <Route path="/spotify/callback" element={<SpotifyLoginRedirectPage/>}/>
            <Route path="/create" element={<CreateLobby/>}/>
            <Route path="/join" element={<JoinLobby/>}/>
            <Route path="/:playlistId" element={<LobbyRoom/>}/>
            <Route path="/:playlistId/player" element={<VideoPlayer/>}/>
        </Routes>
    )
}

export default Router