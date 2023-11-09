import { categories } from "../../Helper/category_data";
import { useNavigate } from "react-router-dom";
import CategoryBtn from "../Button/CategoryBtn";

const CategoryContainer = () => {
  const navigate = useNavigate();

  console.log(categories);

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg">
      {categories.map((category, index) => {
        return (
          <CategoryBtn
            key={index}
            onClick={() => navigate(`/category/${category}`)}
            children={category}
          />
            
          
        );
      })}
    </div>
  );
};

export default CategoryContainer;


