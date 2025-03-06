import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSizeFilter,
  setColorFilter,
  setPriceRange,
  resetFilters,
} from "./filterSlice";
import { RootState } from "@/store/store";
import { ChevronDown, ChevronUp, ListFilterIcon } from "lucide-react";

const FilterComponent = ({
  onApplyFilters,
}: {
  onApplyFilters: () => void;
}) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.buyer.filters);

  const products = useSelector((state: any) => state.buyer.products) || [];
  const productSizes = products.map((product: any) => product.sizes);
  const sizes = [...productSizes];
  const productColors = products.map((product: any) => product.colors);
  const colors = [...productColors];
  const prices = products.map((p: any) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [filterDropdown, setFilterDropdown] = useState(false);

  const handleSizeChange = (size: number) => {
    const newSizes = filters.size.includes(size)
      ? filters.size.filter((s: any) => s !== size)
      : [...filters.size, size];

    dispatch(setSizeFilter(newSizes));
  };

  const handleColorChange = (color: string) => {
    const newColors = filters.color.includes(color)
      ? filters.color.filter((c: any) => c !== color)
      : [...filters.color, color];

    dispatch(setColorFilter(newColors));
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPriceRange([0, Number(event.target.value)]));
  };

  return (
    <div className='relative left-0 filter-container border rounded-md w-[140px]'>
      <button
        className='w-full text-left font-medium bg-gray-100 px-4 py-2 rounded-md flex justify-between'
        onClick={() => setFilterDropdown(!filterDropdown)}
      >
        <h2 className='text-lg font-semibold'>Filter by</h2>
        <ListFilterIcon size={15} />
      </button>

      {filterDropdown && (
        <div className='absolute'>
          {/* Size Filter */}
          <div className='my-4'>
            <button
              className='w-full text-left font-medium bg-gray-100 px-4 py-2 rounded-md flex justify-between'
              onClick={() => setShowSizeDropdown(!showSizeDropdown)}
            >
              Product Size{" "}
              {showSizeDropdown ? (
                <ChevronUp size={15} />
              ) : (
                <ChevronDown size={15} />
              )}
            </button>
            {showSizeDropdown && (
              <div className='mt-2 space-y-2'>
                {sizes.map((size) => (
                  <label key={size} className='flex items-center'>
                    <input
                      type='checkbox'
                      checked={filters?.size.includes(size)}
                      onChange={() => handleSizeChange(size)}
                      className='mr-2'
                    />
                    {size}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Color Filter */}
          <div className='mb-4'>
            <button
              className='w-full text-left font-medium bg-gray-100 px-4 py-2 rounded-md  flex justify-between'
              onClick={() => setShowColorDropdown(!showColorDropdown)}
            >
              Color{" "}
              {showColorDropdown ? (
                <ChevronUp size={15} />
              ) : (
                <ChevronDown size={15} />
              )}
            </button>
            {showColorDropdown && (
              <div className='mt-2 space-y-2'>
                {colors.map((color) => (
                  <label key={color} className='flex items-center'>
                    <input
                      type='checkbox'
                      checked={filters?.color.includes(color)}
                      onChange={() => handleColorChange(color)}
                      className='mr-2'
                    />
                    {color}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className='mb-4'>
            <button
              className='w-full text-left font-medium bg-gray-100 px-4 py-2 rounded-md  flex justify-between'
              onClick={() => setShowPriceDropdown(!showPriceDropdown)}
            >
              Price Range{" "}
              {showPriceDropdown ? (
                <ChevronUp size={15} />
              ) : (
                <ChevronDown size={15} />
              )}
            </button>
            {showPriceDropdown && (
              <div className='mt-2'>
                <input
                  type='range'
                  min={minPrice}
                  max={maxPrice}
                  value={filters?.priceRange[1]}
                  onChange={handlePriceChange}
                  className='w-full'
                />
                <span className='block text-center'>
                  Max Price: #{filters?.priceRange[1]}
                </span>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className='flex justify-between mt-4'>
            <button
              onClick={onApplyFilters}
              className='bg-blue-500 text-white px-4 py-2 rounded-md'
            >
              Apply Filters
            </button>
            <button
              onClick={() => {
                dispatch(resetFilters());
                onApplyFilters();
              }}
              className='bg-gray-400 text-white px-4 py-2 rounded-md'
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
