import React, { useState, useEffect } from "react";
import useDebounce from "../../customhooks/useDebounce"; 
import SearchCss from "./search.module.css";

function SearchBar({ dataset, onSearchResult }) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms delay

  useEffect(() => {
    if (debouncedSearchQuery) {
      const filteredResults = dataset.filter((item) =>
        item.customerName
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase())
      );
      onSearchResult(filteredResults);
    } else {
      onSearchResult(dataset); // If no search result, then return the original data
    }
  }, [debouncedSearchQuery, dataset, onSearchResult]);

  return (
    <input
      type="text"
      placeholder="Search by customer name..."
      value={searchQuery}
      className={SearchCss.searchbar}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

export default SearchBar;
