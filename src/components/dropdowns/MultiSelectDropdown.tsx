"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { FaCheck, FaTimes, FaChevronDown, FaSearch } from "react-icons/fa";

export type Option = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  showSearch?: boolean;
  label: string;
};

export const MultiSelectDropdown = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select...",
  showSearch = false,
  label,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [searchInput, options]);

  const displayLabel =
    selectedValues.length === 0
      ? placeholder
      : options.find((opt) => opt.value === selectedValues[0])?.label || "";
  const extraCount = selectedValues.length - 1;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative max-w-xs" ref={dropdownRef}>
        <button
          className={`flex items-center justify-between px-4 py-2 rounded-full border transition ${
            selectedValues.length > 0
              ? "bg-green-100 text-green-700 border-green-300"
              : "bg-white text-gray-800 border-gray-300"
          } w-full`}
          onClick={toggleDropdown}
        >
          <span className="truncate">
            {displayLabel}
            {extraCount > 0 && `+${extraCount}`}
          </span>
          {selectedValues.length > 0 && (
            <FaTimes
              className="ml-2 text-sm cursor-pointer hover:text-green-500"
              onClick={handleClear}
            />
          )}
          <FaChevronDown className="ml-2 text-xs" />
        </button>

        {isOpen && (
          <div className="absolute left-0 mt-2 z-20 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto max-h-60 min-w-[15rem] max-w-xs w-fit">
            {showSearch && (
              <div className="p-2 border-b">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={`Search ${label.toLowerCase()}`}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full pl-8 pr-2 py-2 rounded focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                  />
                  <FaSearch className="absolute top-3 left-2 text-gray-400 text-xs" />
                </div>
              </div>
            )}
            <ul className="p-2 space-y-2">
              {filteredOptions.length === 0 ? (
                <div className="px-2 py-1 text-gray-500 text-sm">
                  No results found
                </div>
              ) : (
                <>
                  {filteredOptions.map((opt) => {
                    const isSelected = selectedValues.includes(opt.value);
                    return (
                      <li
                        key={opt.value}
                        className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-sm ${
                          isSelected
                            ? "bg-green-100 text-green-700"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleOptionToggle(opt.value)}
                      >
                        <div
                          className={`w-4 h-4 border rounded flex items-center justify-center ${
                            isSelected
                              ? "bg-green-600 border-green-600 text-white"
                              : "border-gray-400"
                          }`}
                        >
                          {isSelected && <FaCheck className="text-xs" />}
                        </div>
                        {opt.label}
                      </li>
                    );
                  })}
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
