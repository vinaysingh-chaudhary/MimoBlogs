import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { LoadingScreen } from "../compConfig";
import { useNavigate, useParams } from "react-router-dom";



const AuthLayout = ( {children , authentication= true}) => {

    const authStatus = useSelector((store)  => store.authentication.authStatus);
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)

     useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
            setLoader(false);

     }, [authStatus, navigate, authentication])

    return loader ? <LoadingScreen /> : <>{children}</>
}

export default AuthLayout;