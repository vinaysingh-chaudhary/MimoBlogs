import { useState } from "react";
import {
  BlogContainer,
  CategoryContainer,
  CategoryContainerPhone,
} from "../../Components/compConfig";
import { getblogs } from "../../Helper/getblogs";
import { takeCareOf } from "../../Helper/to_takecare";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const data = getblogs();
  console.log(data?.blogs);

  const navigate = useNavigate(); 

  return (
    <div className=" w-full h-auto flex flex-col bg-black  items-center">
      <div className="w-full h-12 overflow-x-scroll flex md:hidden my-2 pl-1">
        <CategoryContainerPhone />
      </div>

      <div className=" w-full h-full flex  justify-center lg:justify-center lg:gap-8 xl:gap-0">
        <div className="w-full lg:w-2/4 md:w-[70%] ">
          <BlogContainer {...data} />
        </div>

        <div className="hidden md:flex w-1/3 md:w-[30%] relative flex-col">
          <div className="hidden h-[22%] w-1/4 flex-col md:flex gap-2 fixed top-20 ml-6">
            <p className="text-white text-2xl">Categories</p>
            <CategoryContainer />
          </div>

          <div className="lg:mt-10 lg:pt-4 xl:pt-2 xl:mt-10 2xl:mt-0 2xl:py-4 hidden lg:h-[28%] xl:h-[25%] w-1/4 flex-col lg:flex gap-2 fixed lg:top-72 xl:top-60 ml-6 rounded-2xl bg-[#8080802d] justify-center items-center py-2">
            <div className="h-[80%] w-[94%] xl:w-[96%] items-start flex flex-col px-3 rounded-xl bg-[#80808000] gap-1 lg:pb-5">
              <p className="text-lg text-purple-400">Read before writing</p>
              <ul className="flex justify-between flex-col gap-1 ">
                {takeCareOf.map((string, index) => {
                  return (
                    <li className=" text-white text-[0.8rem]" key={index}>
                      {" "}
                      • {string}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="h-[20%] mb-4">
              <button
                className="hidden md:flex xl:py-2.5 mb-2 xl:px-32 lg:px-24 lg:py-2.5 text-sm font-medium text-puple-500 bg-gray-200 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-purple-500"
                onClick={() => navigate("/create")}
              >
                Write
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
