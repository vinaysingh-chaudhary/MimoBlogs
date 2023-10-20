import React, {useState, useEffect} from "react";
import { BlogForm } from "../../Components/compConfig";
import databaseConfig from "../../appwrite/databaseConfig";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = () => {

    const {id} = useParams(); 
    const navigate = useNavigate();
    const [Blog, setBlogData] = useState(); 
    
    useEffect(() => {
        const getBlog = async() => {
            const blog = await databaseConfig.getDocument(id); 
            setBlogData(blog); 
     
        }

        if(id){
            getBlog(); 
        }
    },[id, navigate]); 

    
    return (
        <div>
            <BlogForm Blog={Blog} />
        </div>
    )
}

export default EditBlog; 