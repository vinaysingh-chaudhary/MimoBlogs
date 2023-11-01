import { useNavigate } from 'react-router-dom';
import {BlogContainer, Button} from '../../Components/compConfig'

const HomePage = () => {

    const navigate = useNavigate(); 




    return(
        <div className=' w-full h-[150vh] flex flex-col bg-black'>

            <div className='h-[20vh] w-full border-2 flex justify-center items-center'>
                
            </div>

        <div className='w-5/6  h-[130vh] flex justify-center py-5'>
            <div className='w-4/6 '>
               <BlogContainer />
            </div>
                
              <div className='w-2/6'>


            </div>  
        </div>
        </div>
    )
}

export default HomePage; 