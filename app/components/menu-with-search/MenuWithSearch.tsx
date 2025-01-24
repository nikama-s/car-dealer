import React, { SetStateAction, useState } from "react";

interface DropdownProps {
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  selectedValue: string;
  setSelectedValue: React.Dispatch<SetStateAction<string>>;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "Search...",
  disabled = false,
  isOpen,
  setIsOpen,
  selectedValue,
  setSelectedValue,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      <button
        onClick={() => setIsOpen(disabled ? false : !isOpen)}
        className="w-full p-2 border bg-white border-gray-300 rounded-md text-left text-black"
      >
        {selectedValue || placeholder}
      </button>
      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="w-full p-2 border-b border-gray-300 rounded-t-md text-black"
          />
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-2 text-gray-500">No options found</div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(option)}
                  className="p-2 cursor-pointer hover:bg-gray-100 text-black"
                >
                  {option}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
