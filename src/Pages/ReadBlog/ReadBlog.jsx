import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import databaseConfig from "../../appwrite/databaseConfig";
import { Button } from "../../Components/compConfig";
import storageConfig  from "../../appwrite/storageConfig";


const ReadBlog = () => {

    const {id} = useParams(); 
    const navigate = useNavigate(); 
    const [blog, setBlogData] = useState(); 
    const userData = useSelector(store => store.authentication.userData);
    const [fileId, setFileId] = useState('')


    const htmlString = blog?.content; // Assuming blog.content is the HTML string
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(htmlString, 'text/html');
    const plainText = parsedHtml.body.textContent;



    const isAuthorised = blog && userData ? blog.userId === userData.currentUser?.$id : false; 

    useEffect(() => {
        const getBlog = async() => {
            const blog = await databaseConfig.getDocument(id) 
            const fileId = storageConfig.getFilePreview(blog?.articleimage)
            setBlogData(blog); 
            setFileId(fileId);
        }

        if(id){
            getBlog(id); 
        }
    },[id, navigate]); 


    const deleteBlog = async() => {
        databaseConfig.deletePost(blog?.$id).then((status) => {
            if(status){
                storageConfig.deleteFile(blog?.articleimage);
                navigate("/")
            }
        })
    }

    return ( 
        <div>
            <p>Hello</p>
                <div >
                    <img src={fileId} alt={blog?.title} />
                </div>

                <p>{blog?.title}</p>
               <div>{plainText}</div> 

                

                {isAuthorised && (
                    <div>
                      <NavLink to={`/edit/${id}`}><Button label={"Edit"}/></NavLink>  
                        <Button label={"Delete"}  onClick ={() => deleteBlog()} />
                    </div>
                )}

                    
 

        </div>
    )
}

export default ReadBlog; 