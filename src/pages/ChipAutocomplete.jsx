import React, { useState, useEffect } from 'react';

const ChipAutoComplete = ({ options, placeholder, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timeoutId = setTimeout(() => {
        const filtered = options.filter(option =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredOptions(filtered);
        setIsLoading(false);
      }, 500); // simulate network request
      return () => clearTimeout(timeoutId);
    } else {
      setFilteredOptions([]);
      setIsLoading(false);
    }
  }, [inputValue, options]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setHighlightedIndex(-1);
  };

  const handleSelect = (option) => {
    if (!selectedOptions.some(selected => selected.value === option.value)) {
      const newSelectedOptions = [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
      setInputValue('');
      setFilteredOptions([]);
      setIsLoading(false);
      if (onChange) {
        onChange(newSelectedOptions);
      }
    }
  };

  const handleRemove = (option) => {
    const newSelectedOptions = selectedOptions.filter(
      selected => selected.value !== option.value
    );
    setSelectedOptions(newSelectedOptions);
    if (onChange) {
      onChange(newSelectedOptions);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (highlightedIndex >= 0) {
        handleSelect(filteredOptions[highlightedIndex]);
      } else if (filteredOptions.length > 0) {
        handleSelect(filteredOptions[0]);
      }
      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1
      );
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap items-center bg-gray-200 rounded-xl p-2 relative">
        {selectedOptions.map(option => (
          <div key={option.value} className="flex items-center bg-white rounded-full px-3 py-1 m-1">
            <span className="text-gray-800 font-medium">{option.label}</span>
            <button
              type="button"
              className="ml-2 text-gray-500 hover:text-gray-800"
              onClick={() => handleRemove(option)}
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-grow p-2 bg-transparent outline-none"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      {filteredOptions.length > 0 && (
        <div className="absolute bg-white shadow-md rounded-xl mt-1 w-full z-10">
          {filteredOptions.map((option, index) => (
            <div
              key={option.value}
              className={`flex items-center p-2 cursor-pointer ${
                index === highlightedIndex ? 'bg-gray-100' : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              <span className="text-blue-500 font-semibold">{option.label.slice(0, 2)}</span>
              <span className="text-gray-700">{option.label.slice(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChipAutoComplete;
