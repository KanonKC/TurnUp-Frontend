import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const BackButton = () => {

    const navigate = useNavigate()

  return (
    <div className='top-5 left-5 absolute'>
    <Button variant="outline" onClick={() => navigate(-1)}>
      <ArrowLeft className='mr-2' size={20} />
        Go Back
      </Button>
    </div>
  )
}

export default BackButton