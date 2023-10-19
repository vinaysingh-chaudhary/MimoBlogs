import React, { useState, useEffect } from "react";
import databaseConfig from '../../appwrite/databaseConfig'
import { BlogCard } from "../../Components/compConfig";

const ListBlogs = () => {
    const [Blogs, setBlogs] = useState([])

    useEffect(() => {
        const getBlogs = async( ) => {
            const allBlogs = await databaseConfig.getPosts([]); 
            setBlogs(allBlogs);
        } 

        getBlogs();
    },[])

    return( 
        <div>
            {
                Blogs.map((blog) => {
                    return <BlogCard key={blog.$id} {...blog}/> 
                })
            }
        </div>
    ); 
}

export default ListBlogs; 