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
    const [loading, setLoader] = useState(true);
    

    const [processedText, setProcessedText] = useState('');

    const textModifier = () => {
        const textWithLineBreaks = blog?.content?.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ));
        setProcessedText(textWithLineBreaks);
      };


    const userData = useSelector(store => store.authentication.userData);
    const [imgPreview, setImgPreview] = useState('')


    const isAuthorised = blog?.userId == userData?.currentUser?.$id ? true : false; 
    console.log(isAuthorised);

    useEffect(() => {
        const getBlog = async() => {
            const blog = await databaseConfig.getDocument(id) 
            const fileId = storageConfig.getFilePreview(blog?.articleimage)
            setBlogData(blog); 
            setImgPreview(fileId);
        }

        if(id){
            getBlog(id); 
        }
    },[id, navigate]); 

    useEffect(() => {
        textModifier(); 
    },[blog])


    const deleteBlog = async() => {
        databaseConfig.deletePost(blog?.$id).then((status) => {
            if(status){
                storageConfig.deleteFile(blog?.articleimage);
                navigate("/")
            }
        })
    }

    // console.log(blog?.content)

    return ( 
        <div className=" w-full h-full text-white flex justify-around items-start">
               
                <div className="w-[30%] pl-2 flex justify-center">
                    <img src={imgPreview} alt={blog?.title}  className=" h-full object-contain rounded-lg mt-12 "/>
                </div>

                <div className="w-[70%] h-full flex flex-col overflow-y-scroll gap-6 pt-10 px-6 no-scrollbar">
                    <p className="text-4xl">{blog?.title}</p>
                    <div className="">{processedText}</div> 

                    {isAuthorised && (
                    <div className="flex justify-center gap-5 pb-3">
                      <NavLink to={`/edit/${id}`}><Button label={"Edit"}/></NavLink>  
                      <Button label={"Delete"}  onClick ={() => deleteBlog()} />
                    </div>
                     )}

                </div>
        </div>
    )
}

export default ReadBlog; 