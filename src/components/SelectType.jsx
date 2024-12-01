import { useEffect, useState, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import PropTypes from "prop-types";
import { fetchAllTypes } from "@/services/api.js";

const SelectType = ({ value, onChange, placeholder }) => {
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetchAllTypes();
        const typesArray = response.data;
        const formattedOptions = typesArray.map((item) => ({
          value: item._id,
          name: item.nom_type,
        }));
        setOptions(formattedOptions);
        setFilteredOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsFocused(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsFocused((prev) => !prev);
  };

  const handleOptionClick = (optionValue) => {
    const selectedOption = options.find((option) => option.value === optionValue);
    onChange(selectedOption);
    setIsFocused(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = options.filter((option) => option.name.toLowerCase().includes(query));
    setFilteredOptions(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      const selectedOption = filteredOptions[selectedIndex];
      if (selectedOption) {
        handleOptionClick(selectedOption.value);
      }
    }
  };

  const handleBlur = (e) => {
    if (!dropdownRef.current.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const displayText = value ? options.find((option) => option.value === value)?.name : placeholder;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        onMouseDown={(e) => e.preventDefault()}
      >
        <span>{displayText}</span>
        {isFocused ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isFocused && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-input bg-background shadow-md">
          <div className="p-2">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              className="w-full h-10 px-3 bg-background rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
          <ul className="max-h-60 overflow-auto" onMouseDown={(e) => e.preventDefault()}>
            {filteredOptions.map((option, index) => (
              <li
                key={option.value}
                className={`cursor-pointer px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground ${
                  selectedIndex === index ? "bg-accent text-accent-foreground" : ""
                }`}
              >
                <button type="button" onClick={() => handleOptionClick(option.value)} className="w-full text-left">
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

SelectType.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SelectType;
