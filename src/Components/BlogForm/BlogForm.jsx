import React, { useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Select } from "../../Components/compConfig";
import databaseConfig from "../../appwrite/databaseConfig";
import storageConfig from "../../appwrite/storageConfig";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { BsImage } from "react-icons/bs";
import { categories } from "../../Helper/category_data";

const BlogForm = ({ Blog }) => {
  const userData = useSelector((store) => store.authentication.userData);
  const userid = userData?.currentUser?.$id || userData?.$id;
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: Blog?.title || "",
      slug: Blog?.slug || "",
      content: Blog?.content || "",
      status: Blog?.status || "active",
    },
  });

  const submitBlogForm = async (data) => {
    if (Blog) {
      const File = data?.articleimage[0]
        ? await storageConfig.uploadFile(data?.articleimage[0])
        : null;
      if (File) {
        storageConfig.deleteFile(Blog?.articleimage);
      }

      const UpdateBlog = await databaseConfig.updatePost(Blog?.$id, {
        ...data,
        articleimage: File ? File.$id : undefined,
      });

      if (UpdateBlog) {
        navigate("/");
      }
    } else {
      const file = await storageConfig.uploadFile(data?.articleimage[0]);
      if (file) {
        data.articleimage = file?.$id;
        data.slug = uid(16);
      }

      const UploadBlog = await databaseConfig.createPost({
        ...data,
        userId: userid,
      });

      if (UploadBlog) {
        navigate("/");
      }
    }
  };

  return (
    <div className=" pt-5 w-full h-[auto] bg-black pl-3">
      <form onSubmit={handleSubmit(submitBlogForm)}>
        <div className="flex justify-center items-center gap-4 px-5">
          <input
            className="w-full h-[7vh] bg-transparent text-4xl text-white  focus:outline-none border-b-[0.20px] border-[#20202098] pb-2"
            placeholder="title..."
            {...register("title", {
              required: true,
            })}
          />

          <div className="w-9 h-9 ">
            <label
              htmlFor="fileLabel"
              className=" relative text-white cursor-pointer"
            >
              <BsImage className="text-3xl text-[#4c4c4c]" />
            </label>

            <input
              type="file"
              id="fileLabel"
              className="absolute hidden"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("articleimage")}
            />
          </div>
        </div>

        <textarea
          className="w-full min-h-[60vh] bg-transparent text-lg text-white focus:outline-none border-b-[0.20px] border-[#20202098] px-5 mt-5 no-scrollbar"
          placeholder="you can start writing from here..."
          {...register("content", {
            required: true,
          })}
        />

        <div className="">
          <Select
            options={categories}
            {...register("status", {
              required: true,
            })}
          />
        </div>

        <div className="mr-3 flex justify-center items-center pt-6">
          <Button type="submit" label={Blog ? "Update" : "Publish"} />
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
