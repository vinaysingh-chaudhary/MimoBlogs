import React, {useState, useEffect} from "react";
import {BlogCard, Button} from '../../Components/compConfig'
import databaseConfig from "../../appwrite/databaseConfig";
import authConfig from "../../appwrite/authConfig";
import { useSelector } from "react-redux";

const HomePage = () => {

    const [Blogs, setBlogs] = useState([])

    useEffect(() => {


        getBlogs();
    },[])

    const getBlogs = async() => {
        const allBlogs = await databaseConfig.getPosts(); 
        console.log(allBlogs)
        setBlogs(allBlogs.documents); 
    } 

    const logout = async() =>{
        await authConfig.logoutUser().then((status) => console.log(status)); 
    }

    const authentication = useSelector(store => store.authentication); 
    console.log(authentication)

    return(
        <div>
            {
                Blogs.map((blog) => {
                    return <BlogCard {...blog} key={blog.$id}/>
                })
            }
            <Button label={"logout"} onClick={() => logout()}/>
        </div>
    )
}

export default HomePage; 