import React, { useState } from "react";
import storageConfig from "../../appwrite/storageConfig";
import { useNavigate } from "react-router-dom";
import databaseConfig from "../../appwrite/databaseConfig";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useEffect } from "react";

const BlogCard = ({ $id, title, articleimage, content, $createdAt, like }) => {
  const navigate = useNavigate();
  const date = $createdAt?.split("T").at(0);
  const [likeCount, setLikeCount] = useState(like);
  const [isLiked, setIsLiked] = useState("unliked");

  // useEffect(() => {
  //   getImage()
  // },[])

  // // console.log(articleimage)

  // const getImage = async(articleimage) => {
  //   const image = await storageConfig.getImages(articleimage)
  //   console.log(image.files[0].name); 
  // }


  const likeHandler = async () => {
    if (isLiked === "unliked") {
      setIsLiked("liked");
      const likeCount = await databaseConfig.updateLike(`${$id}`);
      setLikeCount(likeCount);
    } else {
      setIsLiked("unliked");
      const likeCount = await databaseConfig.updateSubtractedLike(`${$id}`);
      setLikeCount(likeCount);
    }
    try {
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="w-[90%] h-[150px] sm:w-[550px] md:w-[520px] md:h-[180px] lg:w-[580px] lg:min-h-[200px] xl:w-[680px] border-[0.2px] border-gray-500 flex justify-between rounded-3xl p-2 mt-2 text-white bg-card cursor-pointer relative">
      <img
        className=" h-full w-[33%] aspect-square rounded-2xl object-cover "
        src={storageConfig.getFilePreview(articleimage)}
        content={storageConfig.getFilePreview(articleimage)}
        alt={title}
        onClick={() => navigate(`/blog/${$id}`)}
      />

      <div className=" w-[66%] flex flex-col gap-1 justify-center pl-2 py-5">
        <div>
          <p className="text-[#454545] text-[0.8rem]">{date}</p>
          <p className="text-md sm:text-xl" onClick={() => navigate(`/blog/${$id}`)}>
            {title?.length > 40 ? `${title?.slice(0, 35)}...` : title}
          </p>
        </div>

        <p className="text-[#b8b8b8] md:flex text-[0.8rem] sm:text-lg" onClick={() => navigate(`/blog/${$id}`)}>
          {content?.length > 100 ? `${content?.slice(0, 60)}...` : content}
        </p>  
      </div>

      <button className=" h-full flex gap-2 justify-center items-end" onClick={() => likeHandler()}>
          <span>{likeCount}</span>
          {isLiked === "liked" 
          ? (<AiFillHeart className="text-red-500 text-2xl" />) 
          :  (<AiOutlineHeart  className="text-2xl"/>)}
        </button>
    </div>
  );
};

export default BlogCard;
