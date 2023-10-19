import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import databaseConfig from "../../appwrite/databaseConfig";
import { Button } from "../../Components/compConfig";
import storageConfig  from "../../appwrite/storageConfig";




const ReadBlog = () => {

    const {slug} = useParams(); 
    const navigate = useNavigate(); 
    const [blog, setBlogData] = useState(); 

    const userData = useSelector(store => store.authentication.useData);

    const isAuthorised = blog && userData ? post.userId === userData.$id : false; 

    useEffect(() => {
        const getBlog = async() => {
            const blog = await databaseConfig.getDocument(slug); 
            setBlogData(blog); 
        }

        getBlog();
    }, [slug, navigate])


    const deleteBlog = async() => {
        databaseConfig.deletePost(blog.$id).then((status) => {
            if(status){
                storageConfig.deleteFile(blog.articleimage);
                //navigate
            }
        })
    }



    return ( 
        <div>
            <p>Hello</p>
                <div >
                    <img src={storageConfig.getFilePreview(blog.articleimage)} alt={blog.title} />
                </div>

                <p>{blog.title}</p>
                <p>{blog.content}</p>

                

                {isAuthorised && (
                    <div>
                        <Button label={"Edit"}/>
                        <Button label={"Delete"}  onClick ={() => deleteBlog()} />
                    </div>
                )}

                    
 

        </div>
    )
}

export default ReadBlog; 