import { useNavigate } from "react-router-dom";
import { categories } from "../../Helper/category_data";
import CategoryBtn from "../Button/CategoryBtn";

const CategoryContainerPhone = () => {

    const navigate = useNavigate(); 

    return (
        <div className="w-auto h-full flex overflow-x-scroll gap-2 px-2 ">
            {
                categories.map((category, index) => {
                    return <CategoryBtn  children={category} key={index} onClick={() => navigate(`/category/${category}`)} />
                })
            }
        </div>
    )
}

export default CategoryContainerPhone; 