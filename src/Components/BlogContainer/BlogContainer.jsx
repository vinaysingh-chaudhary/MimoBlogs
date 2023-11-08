import { BlogCard, LoadingScreen } from "../compConfig";

const BlogContainer = ({blogs, loading}) => {

    return (
        <div className="h-full w-full flex items-center justify-center no-scrollbar">
            {
                loading 
                ? <LoadingScreen/> 
                : <div className=" h-auto w-full flex flex-col gap-2 items-center pt-1 pb-4 no-scrollbar">
                 {blogs?.map((blog) => {
                    return <BlogCard {...blog} key={blog.$id}/>
                  })  } 
                </div>
            }
        </div>
    )
}

export default BlogContainer; 