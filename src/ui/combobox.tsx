import { Check, ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl } from "./Form";

// Define types for the component props and options
interface ComboboxOption {
  value: string;
  label: string;
  searchTerms?: string[]; // Additional search terms for better matching
}

interface CustomComboboxProps {
  options: ComboboxOption[];
  placeholder?: string;
  form: UseFormReturn<any>;
  name: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  maxDisplayed?: number;
  noResultsMessage?: string;
  multiselect?: boolean; // New prop to enable multiselect mode
}

// Custom Combobox Component 
export const Combobox: React.FC<CustomComboboxProps> = ({ 
  options = [], 
  placeholder = "Select an option...",
  form,
  name,
  searchable = true,
  searchPlaceholder = "Type to search...",
  maxDisplayed = 100,
  noResultsMessage = "No options found",
  multiselect = false, // Default to single select
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<ComboboxOption[]>(options);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Get the current value(s) from form
  const currentValues = form.watch(name) || (multiselect ? [] : '');
  
  // Get selected options for display in multiselect mode
  const selectedOptions = multiselect 
    ? options.filter(option => Array.isArray(currentValues) && currentValues.includes(option.value))
    : [];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Update input value when form value changes externally (for single select mode)
  useEffect(() => {
    if (!multiselect && currentValues) {
      const selectedOption = options.find(option => option.value === currentValues);
      if (selectedOption) {
        setInputValue(selectedOption.label);
      }
    } else if (!multiselect) {
      setInputValue('');
    }
  }, [currentValues, options, multiselect]);
  
  // Filter options based on search query
  useEffect(() => {
    if (!searchable || searchQuery === '') {
      // In multiselect mode, filter out already selected options if needed
      if (multiselect) {
        setFilteredOptions(options);
      } else {
        setFilteredOptions(options);
      }
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = options.filter(option => 
        option.label.toLowerCase().includes(query) || 
        option.value.toLowerCase().includes(query) ||
        (option.searchTerms && option.searchTerms.some(term => term.toLowerCase().includes(query)))
      );
      setFilteredOptions(filtered);
    }
    setHighlightedIndex(0);
  }, [searchQuery, options, searchable, multiselect, currentValues]);
  
  // Focus on search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      // Short delay to ensure the dropdown is rendered
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 10);
    }
  }, [isOpen, searchable]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!multiselect) {
      setInputValue(e.target.value);
      
      // If not searchable mode, filter options based on the input value
      if (!searchable) {
        const query = e.target.value.toLowerCase();
        const filtered = options.filter(option => 
          option.label.toLowerCase().includes(query)
        );
        setFilteredOptions(filtered);
        setIsOpen(true);
      }
      
      // Clear the form value if input is emptied
      if (e.target.value === '') {
        form.setValue(name, '', { shouldValidate: true });
      }
    }
  };
  
  const handleOptionClick = (option: ComboboxOption) => {
    if (multiselect) {
      // Toggle selection
      const newValues = Array.isArray(currentValues) ? [...currentValues] : [];
      const optionIndex = newValues.indexOf(option.value);
      
      if (optionIndex >= 0) {
        // Remove if already selected
        newValues.splice(optionIndex, 1);
      } else {
        // Add if not selected
        newValues.push(option.value);
      }
      
      form.setValue(name, newValues, { shouldValidate: true });
      
      // Don't close dropdown and clear search for multiselect
      // So user can continue selecting
      setSearchQuery('');
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    } else {
      // Single select behavior
      setInputValue(option.label);
      form.setValue(name, option.value, { shouldValidate: true });
      setIsOpen(false);
      setSearchQuery('');
      
      // Focus back on input after selection
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  
  const clearSelection = () => {
    if (multiselect) {
      form.setValue(name, [], { shouldValidate: true });
    } else {
      setInputValue('');
      form.setValue(name, '', { shouldValidate: true });
    }
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const removeOption = (value: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from opening
    
    if (multiselect) {
      const newValues = Array.isArray(currentValues) 
        ? currentValues.filter(v => v !== value) 
        : [];
      form.setValue(name, newValues, { shouldValidate: true });
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        } else {
          setIsOpen(prev => !prev);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };
  
  // Determine if there are options to display
  const hasOptions = filteredOptions.length > 0;
  // Limit the number of options displayed
  const displayedOptions = filteredOptions.slice(0, maxDisplayed);
  // Show "more options" message if there are more options than the limit
  const hasMoreOptions = filteredOptions.length > maxDisplayed;
  
  return (
    <div ref={comboboxRef} className="relative w-full">
      <FormControl>
        <div className="relative">
          {multiselect ? (
            <div 
              className="w-full min-h-12 px-2 py-2 border rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent flex flex-wrap gap-2 cursor-text"
              onClick={() => {
                setIsOpen(true);
                if (searchInputRef.current) {
                  setTimeout(() => searchInputRef.current?.focus(), 10);
                }
              }}
            >
              {selectedOptions.length > 0 ? (
                <>
                  {selectedOptions.map(option => (
                    <div 
                      key={option.value}
                      className="bg-blue-100 text-blue-800 rounded px-2 py-1 flex items-center text-sm"
                    >
                      <span>{option.label}</span>
                      <button
                        type="button"
                        onClick={(e) => removeOption(option.value, e)}
                        className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-gray-400 py-1 px-2">{placeholder}</div>
              )}
            </div>
          ) : (
            <input
              ref={inputRef}
              type="text"
              className="w-full px-4 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onClick={() => setIsOpen(true)}
              readOnly={searchable} // Make read-only if searchable mode is on
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-controls="combobox-options"
            />
          )}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {((multiselect && selectedOptions.length > 0) || (!multiselect && inputValue)) && (
              <button
                type="button"
                onClick={clearSelection}
                className="p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Clear selection"
              >
                <X size={14} />
              </button>
            )}
            <button
              type="button"
              className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              tabIndex={-1}
              aria-label={isOpen ? "Close options" : "Open options"}
            >
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
      </FormControl>
      
      {isOpen && (
        <div
          className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border max-h-72 overflow-hidden flex flex-col"
        >
          {searchable && (
            <div className="sticky top-0 bg-gray-50 border-b p-2">
              <div className="relative">
                <div className="absolute inset-y-0 -left-2 px-3 flex items-center pointer-events-none text-gray-400">
                  <Search size={14} />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  className="w-full pl-8 pr-8 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                />
                {searchQuery && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <ul
            id="combobox-options"
            className="overflow-auto"
            role="listbox"
            aria-labelledby="combobox-label"
            aria-multiselectable={multiselect}
          >
            {hasOptions ? (
              <>
                {displayedOptions.map((option, index) => {
                  const isSelected = multiselect 
                    ? Array.isArray(currentValues) && currentValues.includes(option.value)
                    : currentValues === option.value;
                    
                  return (
                    <li
                      key={option.value}
                      className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                        highlightedIndex === index ? 'bg-blue-100' : ''
                      } ${isSelected ? 'bg-blue-50' : ''}`}
                      onClick={() => handleOptionClick(option)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div className="flex items-center justify-between">
                        {option.label}
                        {isSelected && (
                          <Check size={16} className="text-blue-500" />
                        )}
                      </div>
                    </li>
                  );
                })}
                
                {hasMoreOptions && (
                  <li className="px-4 py-2 text-sm text-gray-500 bg-gray-50 border-t">
                    And {filteredOptions.length - maxDisplayed} more options...
                  </li>
                )}
              </>
            ) : (
              <li className="px-4 py-3 text-gray-500 text-center">{noResultsMessage}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
