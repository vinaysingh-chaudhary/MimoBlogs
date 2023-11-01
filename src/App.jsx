import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import authConfig from './appwrite/authConfig';
import { login, logout } from "./store/slices/authSlice";
import { LoadingScreen, NavbarDesktop} from "./Components/compConfig";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";





function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.authentication); 
  console.log(userData); 


  useEffect(() => {
    const getCurrentUserFunc = async () => {
      try {
        const currentUser = await authConfig.getCurrentUser();
        if (currentUser) {
          dispatch(login({ currentUser }))
        } else {
          dispatch(logout())
        }
      }

      catch (error) {
        console.log(error);
      }
    }

    getCurrentUserFunc();
    setLoading(false);
  }, [])



  return !loading
    ? (
      <div className="w-screen h-screen bg-[#000000]">

        <div className="h-[10vh] w-full">
          <NavbarDesktop />
        </div>


       <div className="h-[80vh] w-full">
          <Outlet />
        </div>

        <div>
          
        </div>

      </div>
    )





    : (<LoadingScreen />)
}

export default App
