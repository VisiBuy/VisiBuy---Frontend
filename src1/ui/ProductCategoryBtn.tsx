import { NavLink } from "react-router-dom";

interface ProductCategoryBtnProps {
  text: string; 
  link: string; 
}

const ProductCategoryBtn: React.FC<ProductCategoryBtnProps> = ({ text, link }) => {
  return (
    <NavLink
      to={`/category/${link}`} 
      className={({ isActive }) =>
        isActive
          ? "relative shadow-md hover:shadow-xl p-2 px-4 rounded bg-blue-200 capitalize text-blue-600 font-bold"
          : "relative shadow-md hover:shadow-xl p-2 px-4 rounded bg-gray-300 capitalize text-gray-500 font-bold"
      }
    >
      {text} 
      
    </NavLink>
  );
};

export default ProductCategoryBtn;
