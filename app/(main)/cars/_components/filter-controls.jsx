"use client";

import { Slider } from '@/components/ui/slider';
import React from 'react'
import { formatCurrency } from "@/lib/helper"; // ✅ import your helper
import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CarFilterControls = ({ 
  filters,
  currentFilters,
  onFilterChange,
  onClearFilter,
 }) => {

  const { make, bodyType, fuelType, transmission, priceRange } = currentFilters;

   const filterSections = [
    {
      id: "make",
      title: "Make",
      options: filters.makes.map((make) => ({ value: make, label: make })),
      currentValue: make,
      onChange: (value) => onFilterChange("make", value),
    },
    {
      id: "bodyType",
      title: "Body Type",
      options: filters.bodyTypes.map((type) => ({ value: type, label: type })),
      currentValue: bodyType,
      onChange: (value) => onFilterChange("bodyType", value),
    },
    {
      id: "fuelType",
      title: "Fuel Type",
      options: filters.fuelTypes.map((type) => ({ value: type, label: type })),
      currentValue: fuelType,
      onChange: (value) => onFilterChange("fuelType", value),
    },
    {
      id: "transmission",
      title: "Transmission",
      options: filters.transmissions.map((type) => ({
        value: type,
        label: type,
      })),
      currentValue: transmission,
      onChange: (value) => onFilterChange("transmission", value),
    },
  ];


  return (
     <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
      {/* Price Range */}
      <div className="space-y-4 px-2">
        <h3 className="font-medium">Price Range</h3>
        <div className="px-2">
          <Slider
            min={filters.priceRange.min}
            max={filters.priceRange.max}
            step={100}
            value={priceRange}
            onValueChange={(value) => onFilterChange("priceRange", value)}
          />
        </div>
        <div className="flex items-center justify-between">
           {/* ✅ Use formatCurrency helper */}
          <div className="font-medium text-sm">
            {formatCurrency(priceRange[0])}
          </div>
          <div className="font-medium text-sm">
            {formatCurrency(priceRange[1])}
          </div>
        </div>
      </div>

       {/* Filter Categories */}
      {filterSections.map((section) => (
        <div key={section.id} className="space-y-3 px-2 border-b pb-3 last:border-none">
          <h4 className="text-sm font-medium flex justify-between items-center">
            <span>{section.title}</span>
            {section.currentValue && (
              <button
                className="text-xs text-gray-600 flex items-cente hover:text-red-500"
                onClick={() => onClearFilter(section.id)}
              >
                <X className="mr-1 h-3 w-3" />
                Clear
              </button>
            )}
          </h4>

          <div className="flex flex-wrap gap-2">
            {section.options.map((option) => (
              <Badge
                key={option.value}
                variant={
                  section.currentValue === option.value ? "default" : "outline"
                }
                className={`cursor-pointer px-3 py-1 transition-colors duration-150
                  ${
                  section.currentValue === option.value
                    ? "bg-blue-100 hover:bg-blue-200 text-blue-900 border-blue-200"
                    : "bg-white hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => {
                  section.onChange(
                    section.currentValue === option.value ? "" : option.value
                  );
                }}
              >
                {option.label}
                {section.currentValue === option.value && (
                  <Check className="ml-1 h-3 w-3 inline" />
                )}
              </Badge>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
};

export default CarFilterControls;