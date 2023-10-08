import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import authConfig from './appwrite/authConfig'; 
import { login, logout } from "./store/slices/authSlice";
import { Header, Footer, LoadingScreen, Button, Input, Select, LoginForm } from "./Components/compConfig";



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
          dispatch(logout())  //payloading currentuser data as object in authslice 
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
    {/* <Header />
    <Footer />
    <Button children={"Submit"}/>
    <Input label={"hello"} placeholder={"Enter Email"} type={"password"}/>
    <Select options={["opt1", "opt2", "opt3"]}  label={"SELECT  "}/> */}

    <LoginForm />



  </div>
  ) 
  : (<LoadingScreen/>)
}

export default App
