import { useParams } from "react-router-dom"
import { BlogContainer } from "../../Components/compConfig";
import { getblogs } from "../../Helper/getblogs";


const CategoryPage = () => {
    const { category } = useParams();
    const data = getblogs(category);

    return (
       <div className=" w-full h-auto  flex flex-col bg-black no-scrollbar">
          <BlogContainer {...data} />
        </div>
    )
}

export default CategoryPage; 