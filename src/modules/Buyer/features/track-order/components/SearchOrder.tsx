import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchOrderProps {
  onSearch: (query: string) => void;
  className?: string; // Allow className as a prop
}

const SearchOrder: React.FC<SearchOrderProps> = ({ onSearch, className }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  return (
    <div className={`relative flex items-center w-full max-w-xs ${className || ""}`}>
      <FaSearch className="absolute left-3 text-blue text-xl" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search order"
        className="w-full rounded-md py-2 pl-10 font-OpenSans text-xl pr-3 bg-blue-200 focus:outline-none focus:border-blue placeholder-blue font-semibold caret-blue"
      />
    </div>
  );
};

export default SearchOrder;
