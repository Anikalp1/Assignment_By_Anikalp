import React, { useState } from 'react';
import Select, { components } from 'react-select';

const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <span className="text-blue-500 font-semibold">{props.data.label.slice(0, 2)}</span>
      <span className="text-gray-700">{props.data.label.slice(2)}</span>
    </components.Option>
  );
};

const ChipAutoComplete = ({ options, placeholder, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (selectedValue) => {
    setSelectedOptions(selectedValue);
    setIsLoading(false);
    if (onChange) {
      onChange(selectedValue);
    }
  };

  const handleInputChange = (inputValue) => {
    setIsLoading(!!inputValue);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#f0f0f0',
      minHeight: '48px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderColor: 'transparent',
      '&:hover': {
        borderColor: '#d1d5db',
      },
      display: 'flex',
      alignItems: 'center',
      paddingRight: '48px',
      overflowX: 'auto',  // Added for horizontal scrolling
      whiteSpace: 'nowrap', // Prevents line breaks
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '4px 12px',
      display: 'inline-flex',  // Ensures chips are displayed inline
      alignItems: 'center',
      margin: '2px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#374151',
      fontWeight: '500',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#9ca3af',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#e5e7eb',
        color: '#374151',
      },
    }),
    input: (provided) => ({
      ...provided,
      marginLeft: '4px',
      color: '#374151',
      fontWeight: '500',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
      fontWeight: '500',
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: '8px',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '0',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#e5e7eb' : state.isFocused ? '#f9fafb' : 'white',
      color: '#374151',
      padding: '10px 15px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    }),
  };

  return (
    <div className="relative w-full">
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        onInputChange={handleInputChange}
        placeholder={placeholder}
        styles={customStyles}
        components={{ Option: CustomOption }}
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ChipAutoComplete;
