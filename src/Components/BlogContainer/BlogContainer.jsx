import { useState, useEffect } from "react";
import databaseConfig from "../../appwrite/databaseConfig";
import { BlogCard, LoadingScreen } from "../compConfig";



const BlogContainer = () => {
    
    const [Blogs, setBlogs] = useState([]); 
    const [loading, setLoading] = useState(true); 
    console.log(Blogs);
    
    useEffect(() => {
        getBlogs(); 
    },[]); 
    
    const getBlogs = async() => {
       const blogs = await databaseConfig.getPosts(); 
       setBlogs(blogs.documents); 
       setLoading(false);
    }



    return (
        <div className=" h-full w-full flex items-center justify-center">
            {
                loading 
                ? <LoadingScreen/> 
                : <div className=" h-full w-full flex flex-col gap-2 items-center overflow-y-scroll">
                 {Blogs?.map((blog) => {
                    return <BlogCard {...blog} key={blog.$id}/>
                  })  } 
                </div>
            }
        </div>
    )
}

export default BlogContainer; 