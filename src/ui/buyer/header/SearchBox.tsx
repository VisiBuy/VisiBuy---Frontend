import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBox = ({
  placeholder,
  onSearch,
}: {
  placeholder: string;
  onSearch?: (query: string) => void;
}) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      // Search string remains generic; backend or search page parses it
      const searchParams = new URLSearchParams({ q: trimmedQuery });
      navigate(`/search?${searchParams.toString()}`);

      onSearch?.(trimmedQuery);
    }
  };

  return (
    <div className="flex items-center bg-blue-200 p-2 rounded-md w-[310px] lg:w-[300px]">
      <FaSearch
        className="text-blue text-2xl mx-2 cursor-pointer"
        onClick={handleSearch}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="w-full bg-transparent focus:outline-none placeholder-blue font-semibold font-OpenSans text-blue text-[13px] lg:text-[16px] caret-blue"
      />
    </div>
  );
};

export default SearchBox;
