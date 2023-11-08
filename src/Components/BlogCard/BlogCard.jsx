import React, { useState } from "react";
import storageConfig from "../../appwrite/storageConfig";
import { useNavigate } from "react-router-dom";
import databaseConfig from "../../appwrite/databaseConfig";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const BlogCard = ({ $id, title, articleimage, content, $createdAt, like }) => {
  const navigate = useNavigate();
  const date = $createdAt?.split("T").at(0);
  const [likeCount, setLikeCount] = useState(like);
  const [isLiked, setIsLiked] = useState("unliked");

  console.log(isLiked);

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
    <div className=" lg:w-[700px] lg:min-h-[200px] border-[0.2px] border-gray-500 flex rounded-3xl p-2 mt-2 text-white bg-card cursor-pointer">
      <img
        className=" h-full w-48 aspect-square rounded-2xl object-cover "
        src={storageConfig.getFilePreview(articleimage)}
        alt={title}
        onClick={() => navigate(`/blog/${$id}`)}
      />

      <div className="flex flex-col gap-1 justify-around pl-2 py-5">
        <div>
          <p className="text-[#454545]">
            {date} <span className="text-white">Like : {likeCount}</span>
          </p>
          <p className="text-2xl" onClick={() => navigate(`/blog/${$id}`)}>
            {title?.length > 40 ? `${title?.slice(0, 35)}...` : title}
          </p>
        </div>

        <p className="text-[#b8b8b8]" onClick={() => navigate(`/blog/${$id}`)}>
          {content?.length > 100 ? `${content?.slice(0, 150)}...` : content}
        </p>

        <button className="border-2" onClick={() => likeHandler()}>
          {isLiked === "liked" ? (
            <AiFillHeart className="text-red-500" />
          ) : (
            <AiOutlineHeart />
          )}
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
