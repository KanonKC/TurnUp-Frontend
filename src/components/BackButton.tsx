import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

const BackButton = () => {

    const navigate = useNavigate()

  return (
    <div className='top-5 left-5 absolute'>
    <Button variant="outline" onClick={() => navigate("./../")}>
      <ArrowLeft className='mr-2' size={20} />
        Go Back
      </Button>
    </div>
  )
}

export default BackButton