import { Button } from '@/components/ui/button'
import CenterContainer from '@/layouts/CenterContainer'
import { PlaylistService } from '@/services/apis/Playlist.service'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateLobby = () => {
    
    const navigate = useNavigate()
    const handleCreateLobby = async () => {


        // Random between 0 - 999999
        let randomId = Math.floor(Math.random() * 1000000).toString()
        
        while (randomId.length < 6) {
            randomId = "0" + randomId
        }

        PlaylistService.create(randomId).then((response) => {
            navigate(`/${response.data.id}/player`)
        })
    }

  return (
    <CenterContainer>
        <Button onClick={handleCreateLobby}>Create Lobby</Button>
    </CenterContainer>
  )
}

export default CreateLobby