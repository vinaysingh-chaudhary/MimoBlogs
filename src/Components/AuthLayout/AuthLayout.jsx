import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { LoadingScreen } from "../compConfig";
import { useNavigate } from "react-router-dom";



const AuthLayout = ( {children , authentication = true}) => {

    const authStatus = useSelector((store)  => store.authentication.authStatus);
    // const navigate = useNavigate()
    const [loader, setLoader] = useState(true)




     useEffect(() => {
            if( authentication && authStatus !== authentication){        //true || false !== true (false is not equal to true ? yes the statement is true) -> true (so navigate to login)
                // navigate("/login")
            } else if( authentication && authStatus === authentication){      //true || true === true => true (so navigate to home screen)
                // navigate("/")
            }

            setLoader(false);

     }, [authStatus, authentication])

    return loader ? <LoadingScreen /> : <>{children}</>
}

export default AuthLayout;