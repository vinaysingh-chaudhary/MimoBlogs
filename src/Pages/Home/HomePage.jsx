import { BlogContainer, CategoryContainer, CategoryContainerPhone } from "../../Components/compConfig";
import { getblogs } from "../../Helper/getblogs";


const HomePage = () => {
  const data = getblogs(); 
  console.log(data?.blogs)

  return (
    <div className=" w-full h-auto flex flex-col bg-black  items-center">

      <div className="w-full h-12 overflow-x-scroll flex md:hidden my-2 pl-1">
           <CategoryContainerPhone />
      </div>

      <div className=" w-full h-full flex  justify-center lg:justify-center lg:gap-8 xl:gap-0" >

        <div className="w-full lg:w-2/4 md:w-[70%] ">
          <BlogContainer {...data} />
        </div>

        <div className="hidden md:flex w-1/3 md:w-[30%] relative ">


              <div className="hidden h-[22%] w-1/4 flex-col md:flex gap-2 fixed top-20 ml-6">
                  <p className="text-white text-2xl">Categories</p>
                  <CategoryContainer />
              </div>


        </div>
      </div>
    </div>
  );
};

export default HomePage;
