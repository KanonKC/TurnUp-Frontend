import { Route, Routes, useParams } from 'react-router-dom'
import CreateLobby from './views/CreateLobby'
import Home from './views/Home'
import JoinLobby from './views/JoinLobby'
import VideoPlayer from './views/PlayerRoom'
import LobbyRoom from './views/LobbyRoom'
import { useEffect } from 'react'

const Router = () => {

    const { playlistId } = useParams();

    useEffect(() => {
        console.log('from router', playlistId)
    }, [playlistId])

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            {/* <Route path="/player" element={<VideoPlayer/>}/> */}
            <Route path="/create" element={<CreateLobby/>}/>
            <Route path="/join" element={<JoinLobby/>}/>
            <Route path="/:playlistId" element={<LobbyRoom/>}/>
            <Route path="/:playlistId/player" element={<VideoPlayer/>}/>
        </Routes>
    )
}

export default Router