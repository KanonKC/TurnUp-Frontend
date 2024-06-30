import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {

    const navigate = useNavigate()

  return (
    <div className='top-5 left-5 absolute'>
    <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  )
}

export default BackButton