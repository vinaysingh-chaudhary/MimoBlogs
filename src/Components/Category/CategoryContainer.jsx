import { categories } from "../../Helper/category_data";
import { useNavigate } from "react-router-dom";

const CategoryContainer = () => {
  const navigate = useNavigate();

  console.log(categories);

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg">
      {categories.map((category, index) => {
        return (
          <button
            key={index}
            className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-purple-500"
            onClick={() => navigate(`/category/${category}`)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryContainer;
