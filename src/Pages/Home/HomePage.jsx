import React, {useState, useEffect} from "react";
import {BlogCard, Button} from '../../Components/compConfig'
import databaseConfig from "../../appwrite/databaseConfig";
import authConfig from "../../appwrite/authConfig";
import { useSelector } from "react-redux";

const HomePage = () => {

    const [Blogs, setBlogs] = useState([])

    useEffect(() => {
        databaseConfig.getPosts().then((respone) => console.log(respone))

     
    },[])



    const logout = async() =>{
        await authConfig.logoutUser().then((status) => console.log(status)); 
    }

    const authentication = useSelector(store => store.authentication); 
    console.log(authentication)


    return(
        <div>
            <Button label={"logout"} onClick={() => logout()}/>
        </div>
    )
}

export default HomePage; 