"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";

type PriceRangeSliderProps = {
  minPrice: number;
  maxPrice: number;
  defaultMin: number;
  defaultMax: number;
  onApply: (min: number, max: number) => void;
};

export const PriceRangeSlider = ({
  minPrice,
  maxPrice,
  defaultMin,
  defaultMax,
  onApply,
}: PriceRangeSliderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMin, setCurrentMin] = useState(defaultMin);
  const [currentMax, setCurrentMax] = useState(defaultMax);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const reset = () => {
    setCurrentMin(defaultMin);
    setCurrentMax(defaultMax);
  };

  const apply = () => {
    onApply(currentMin, currentMax);
    setIsOpen(false);
  };

  const minPercent = ((currentMin - minPrice) / (maxPrice - minPrice)) * 100;
  const maxPercent = ((currentMax - minPrice) / (maxPrice - minPrice)) * 100;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative max-w-xs" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between px-4 py-2 rounded-full border transition w-full
        bg-white text-gray-800 border-gray-300 hover:border-green-400 hover:bg-green-50"
      >
        <span className="truncate">
          Price: ${currentMin} - ${currentMax}
        </span>
        <div className="flex items-center gap-2">
          {(currentMin !== defaultMin || currentMax !== defaultMax) && (
            <FaTimes
              className="text-xs cursor-pointer hover:text-green-500"
              onClick={(e) => {
                e.stopPropagation();
                reset();
              }}
            />
          )}
          <FaChevronDown className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-full max-w-xs">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Select Price Range</h3>

          <div className="flex justify-between items-center gap-2 mb-4">
            <div className="flex flex-col items-start w-1/2">
              <label className="text-xs text-gray-600 mb-1">Min Price</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                min={minPrice}
                max={currentMax}
                value={currentMin}
                onChange={(e) =>
                  setCurrentMin(Math.min(Math.max(minPrice, +e.target.value), currentMax))
                }
              />
            </div>
            <div className="flex flex-col items-start w-1/2">
              <label className="text-xs text-gray-600 mb-1">Max Price</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                min={currentMin}
                max={maxPrice}
                value={currentMax}
                onChange={(e) =>
                  setCurrentMax(Math.max(Math.min(maxPrice, +e.target.value), currentMin))
                }
              />
            </div>
          </div>

          <div className="relative h-2 bg-gray-200 rounded mb-6">
            <div
              className="absolute h-2 bg-green-500 rounded"
              style={{
                left: `${minPercent}%`,
                right: `${100 - maxPercent}%`,
              }}
            />
            <div
              className="absolute w-4 h-4 bg-white border-2 border-green-500 rounded-full top-[-6px] transform -translate-x-1/2"
              style={{ left: `${minPercent}%` }}
            ></div>
            <div
              className="absolute w-4 h-4 bg-white border-2 border-green-500 rounded-full top-[-6px] transform -translate-x-1/2"
              style={{ left: `${maxPercent}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={reset}
              className="text-gray-600 text-sm hover:text-gray-800 transition"
            >
              Reset
            </button>
            <button
              onClick={apply}
              className="px-4 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-700 transition"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
