

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchOrderProps {
  onSearch: (query: string) => void;
}

const SearchOrder: React.FC<SearchOrderProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  return (
    <div className="relative w-full max-w-xs">
      {/* <FaSearch
        className="text-blue text-xl mx-2 cursor-pointer"
        
      /> */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search order"
        className="w-full border border-none rounded-md py-2 px-3 bg-blue-200 focus:outline-none focus:border-blue placeholder-blue font-semibold caret-blue"
      />
    </div>
  );
};

export default SearchOrder;
