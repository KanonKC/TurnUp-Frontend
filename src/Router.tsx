import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import VideoPlayer from './views/PlayerRoom'
import LobbyRoom from './views/LobbyRoom'
import CreateLobby from './views/CreateLobby'
import JoinLobby from './views/JoinLobby'

const Router = () => {
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