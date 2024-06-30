import BackButton from '@/components/BackButton'
import TitleHeader from '@/components/TitleHeader'
import { Button } from '@/components/ui/button'
import CenterContainer from '@/layouts/CenterContainer'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  return (
    <CenterContainer>
      <div className='flex flex-col gap-2 mt-10'>
        <Button className='px-24' onClick={() => navigate("/create")}>Create a Lobby</Button>
        <Button className='px-24' variant="outline" onClick={() => navigate("/join")}>Join an existing Lobby</Button>
      </div>
    </CenterContainer>
  )
}

export default Home