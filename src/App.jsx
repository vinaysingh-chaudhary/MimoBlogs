import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import authConfig from './appwrite/authConfig'; 
import { login, logout } from "./store/slices/authSlice";
import { LoadingScreen} from "./Components/compConfig";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";



function App() {
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch(); 


  useEffect(() => {
    const getCurrentUserFunc = async() => {
      try {
        const currentUser = await authConfig.getCurrentUser(); 
        if(currentUser){ 
          dispatch(login({currentUser}))
        }else{
          dispatch(logout())  
       }}

      catch (error) {
        console.log(error);
      }
    }

    getCurrentUserFunc(); 
    setLoading(false);
  },[])

  

  return !loading 
  ? (
  <div className="pl-4">

    <nav><ul>
     <NavLink to="/"><li>home</li></NavLink> 
     <NavLink to="/login"><li>login</li></NavLink> 
     <NavLink to="/create"><li>create</li></NavLink> 
     <NavLink to="/signup"><li>Signup</li></NavLink> 
    </ul></nav>

    <Outlet />

  </div>
  ) 
  : (<LoadingScreen/>)
}

export default App
