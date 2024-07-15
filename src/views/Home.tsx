import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import CenterContainer from '@/layouts/CenterContainer'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  return (
    <CenterContainer hideBackButton>
      <div className='flex flex-col gap-2 mt-10'>
        <Button className='px-24' onClick={() => navigate("/create")}>Create a Lobby</Button>
        <div className='flex items-center justify-center gap-2'>
          <Separator className='w-[45%]'/>
          <div className='text-xs'>OR</div>
          <Separator className='w-[45%]'/>
        </div>
        <Button className='px-24' variant="outline" onClick={() => navigate("/join")}>Join an existing Lobby</Button>
      </div>
    </CenterContainer>
  )
}

export default Home