import React from "react";
import storageConfig from '../../appwrite/storageConfig'
import { useNavigate } from "react-router-dom";


const BlogCard = ({$id, title, articleimage}) => {
    const navigate = useNavigate()


    return ( 
        <div onClick={() => navigate(`/blog/${$id}`)}>
                <img src={storageConfig.getFilePreview(articleimage)} alt={title} />
                <p>{title}</p>
        </div>
    )
}

export default BlogCard;