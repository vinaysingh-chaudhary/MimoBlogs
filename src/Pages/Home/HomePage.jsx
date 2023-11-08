import { BlogContainer, CategoryContainer } from "../../Components/compConfig";
import { getblogs } from "../../Helper/getblogs";


const HomePage = () => {
  const data = getblogs(); 
  console.log(data?.blogs)

  return (
    <div className=" w-full h-auto  flex flex-col bg-mimogray no-scrollbar">
      <div className=" w-full h-full flex justify-center no-scrollbar">

        <div className="w-2/4 no-scrollbar ">
          <BlogContainer {...data} />
        </div>

        <div className="w-1/3 relative ">


              <div className="h-[22%] w-1/4 flex-col flex gap-2 fixed top-20 ml-6">
                  <p className="text-white text-2xl">Categories</p>
                  <CategoryContainer />
              </div>


        </div>
      </div>
    </div>
  );
};

export default HomePage;
