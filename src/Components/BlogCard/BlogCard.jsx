import React from "react";
import storageConfig from "../../appwrite/storageConfig";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ $id, title, articleimage, content }) => {
  const navigate = useNavigate();



  return (
    <div
      className=" lg:w-[700px] lg:min-h-[150px] border-[0.2px] border-gray-500 flex rounded-3xl p-2 mt-2 text-white bg-[#1818188e]"
      onClick={() => navigate(`/blog/${$id}`)}
    >
      <img
        className=" h-full w-48 aspect-video rounded-2xl object-cover "
        src={storageConfig.getFilePreview(articleimage)}
        alt={title}
      />

      <div className="flex flex-col gap-3 justify-center pl-2">
            <p className="text-2xl">{title?.length > 40 ? `${title?.slice(0, 35)}...` : title}</p>
            <p>{content?.length > 100 ? `${content?.slice(0, 70)}...` : content}</p>
      </div>
    </div>
  );
};

export default BlogCard;
