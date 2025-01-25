import React, { useState, useEffect } from "react";
import TransCss from "./alltransactions.module.css";
import Loader from "../../utility/loader/Loader.jsx";
import { getHeaders } from "../../business-logic/utilityFunctions.js";
import Table from "../../utility/table/Table.jsx";
import SearchBar from "../../utility/searchbar/SearchBar.jsx";
import useDebounce from "../../customhooks/useDebounce.js";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const AllTransactions = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("transactionDate");
  const [filterYear, setFilterYear] = useState("");

  // Debounce Custom Hook
  useDebounce(searchQuery, 500);

  // Initial Render useEffect
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${baseUrl}/api/transactions`);
        const transactions = await response.json();
        transactions.sort((a, b) => {
          return new Date(b.transactionDate) - new Date(a.transactionDate);
        });
        setData(transactions);
        setIsLoading(false);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);


  useEffect(() => {
    if (data?.length > 0) {
      const keyValues = getHeaders(data);
      setHeaders(keyValues);
    }
  }, [data]);


  // Sorting handler based on selected Sorting option from dropdown
  const handleSort = (e) => {
    const sortField = e.target.value;
    setSortField(sortField);
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortField === "amount") {
        return b.amount - a.amount;
      } else if (sortField === "customerId") {
        return a.customerId - b.customerId;
      }

      return new Date(b.transactionDate) - new Date(a.transactionDate);
    });
    setFilteredData(sortedData);
  };

  // Filter functionality for month/ year based
  const handleFilterYear = (e) => {
    const inputValue = e.target.value;
    setFilterYear(inputValue);
    if (inputValue === "2023" || inputValue === "2024") {
      const filteredResults = data.filter(
        (item) =>
          new Date(item.transactionDate).getFullYear() === parseInt(inputValue)
      );
      setFilteredData(filteredResults);
    } else if (
      inputValue === "10" ||
      inputValue === "11" ||
      inputValue === "12"
    ) {
      const filteredResults = data.filter(
        (item) =>
          new Date(item.transactionDate).getMonth() + 1 === parseInt(inputValue)
      );
      setFilteredData(filteredResults);
    } else {
      setFilteredData(data); // Reset to original data if no filter is applied
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className={TransCss.container}>
          <div className={TransCss.controls}>
            <div className={TransCss.sortContainer}>
              {/* Sort Dropdown */}
              <select
                className={TransCss.select}
                onChange={handleSort}
                value={sortField}
              >
                <option value="transactionDate">Sort By Date</option>
                <option value="amount">Sort By Amount</option>
                <option value="customerId">Sort By CustomerId</option>
              </select>

              {/* Filter by Year */}
              <select
                className={TransCss.select}
                onChange={handleFilterYear}
                value={filterYear}
              >
                <option value="">All Transactions</option>
                <option value="10">October Month</option>
                <option value="11">November Month</option>
                <option value="12">December Month</option>
                <option value="2023">2023 Transactions</option>
                <option value="2024">2024 Transactions</option>
              </select>
            </div>

            {/* Search Bar Component*/}
            <SearchBar dataset={data} onSearchResult={setFilteredData} />
          </div>

          {filteredData.length > 0 ? (
            // Custom Table Component
            <Table headers={headers} data={filteredData} hasActions={false} />
          ) : 
          <div className={TransCss.noRecords}>No Records Found !</div>}
        </div>
      )}
    </>
  );
};

export default AllTransactions;
