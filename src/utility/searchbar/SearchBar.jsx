import React, { useState, useEffect } from "react";
import useDebounce from "../../customhooks/useDebounce"; // Import your debounce hook
import SearchCss from "./search.module.css";

function SearchBar({ dataset, onSearchResult }) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms delay

  useEffect(() => {
    if (debouncedSearchQuery) {
      const filteredResults = dataset.filter((item) =>
        item.customerName.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
      onSearchResult(filteredResults); // Return filtered results to parent
    } else {
      onSearchResult(dataset); // If no search, return the original dataset
    }
  }, [debouncedSearchQuery, dataset, onSearchResult]);

  return (
    // <div className={SearchCss.searchbarContainer}>
      <input
        type="text"
        placeholder="Search by customer name..."
        value={searchQuery}
        className={SearchCss.searchbar}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    // </div>
  );
}

export default SearchBar;
