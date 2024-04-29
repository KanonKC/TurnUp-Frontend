import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import VideoPlayer from './views/PlayerRoom'

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/player" element={<VideoPlayer/>}/>
    </Routes>
  )
}

export default Router