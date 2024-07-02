import React from 'react'
import { Button } from './ui/button'
import { PlaylistService } from '@/services/apis/Playlist.service'
import { QueueService } from '@/services/apis/Queue.service'
import socket from '@/socket'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from './ui/dialog'

const ClearPlaylistButton = ({
    playlistId
}:{
    playlistId: string
}) => {

    const handleClick = () => {
        QueueService.clear(playlistId).then(() => {
          socket.emit("reloadQueuesInPlaylist", playlistId);
        })
    }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="text-white bg-red-600 hover:bg-red-700">Clear Playlist</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Clear Playlist Confirmation</DialogTitle>
        <DialogDescription>
          <p>Are you sure you want to clear this playlist?</p>
          <b>This will remove all songs from the playlist and cannot be undone.</b>
        </DialogDescription>
        <DialogFooter>
          <div className="flex justify-end mt-4">
            <Button className="text-white bg-red-600 hover:bg-red-700" onClick={handleClick}>Clear Playlist</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ClearPlaylistButton