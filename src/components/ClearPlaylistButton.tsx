import React from 'react'
import { Button } from './ui/button'
import { PlaylistService } from '@/services/apis/Playlist.service'
import { QueueService } from '@/services/apis/Queue.service'

const ClearPlaylistButton = ({
    playlistId
}:{
    playlistId: string
}) => {

    const handleClick = () => {
        QueueService.clear(playlistId)
    }

  return (
    <Button onClick={handleClick} className="text-white bg-red-600 hover:bg-red-700">Clear Playlist</Button>
  )
}

export default ClearPlaylistButton