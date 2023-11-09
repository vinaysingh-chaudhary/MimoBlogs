import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import databaseConfig from "../../appwrite/databaseConfig";
import { Button } from "../../Components/compConfig";
import storageConfig  from "../../appwrite/storageConfig";
import CategoryBtn from "../../Components/Button/CategoryBtn";


const textSizes = [
    { size : "md", label: "M" },
    { size : "lg", label: "L" },
    { size : "2xl", label: "XL" },
]


const ReadBlog = () => {

    const {id} = useParams(); 
    const navigate = useNavigate(); 
    const [blog, setBlogData] = useState(); 
    const [loading, setLoader] = useState(true);
    const [textSize, setTextSize] = useState(textSizes[0].size)

    console.log(textSize); 
    

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


    return ( 
        <div className=" w-full h-full text-white flex flex-col md:flex-row md:justify-around items-center md:items-start">
               
                <div className="w-[95%] h-[50%] mb-5 md:h-full flex-col md:w-[30%] flex justify-start items-center">
                    <div className="md:mb-4 mt-4">
                       <img src={imgPreview} alt={blog?.title}  className=" h-full object-contain rounded-lg "/>
                    </div>

                    <div className="w-full h-10 md:h-20 flex flex-row md:flex-col justify-center items-center mt-5 md:mt-10 gap-2">
                        <p>choose text size    </p>
                        <div className="flex gap-2">
                        {
                           textSizes.map(({label, size}) => {
                            return <CategoryBtn children={label} onClick={() => setTextSize(size)} key={label}/>
                           } ) 
                        }
                        </div>
                    </div>
                   
                </div>

                <div className="w-[95%] md:w-[60%] h-full flex flex-col overflow-y-scroll md:gap-6 gap-4 px-2 md:pt-5">
                    <p className="text-2xl">{blog?.title}</p>
                    <div className={`text-${textSize}`} >{processedText}</div> 

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