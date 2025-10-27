import React from 'react';

/**
 * PUBLIC_INTERFACE
 * SearchBar is a controlled input for searching.
 */
export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <input
      className="input search"
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search"
    />
  );
}
