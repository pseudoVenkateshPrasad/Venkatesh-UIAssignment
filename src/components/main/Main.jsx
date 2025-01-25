import { useEffect, useState } from "react";
import {
  getHeaders,
  aggregatePoints,
} from "../../business-logic/rewardsCalculator";
import MainCss from "./main.module.css";
import Loader from "../../utility/loader/Loader";
import CustomModal from "../../utility/modal/CustomModal";
import Table from "../../utility/table/Table";
import useDebounce from "../../customhooks/useDebounce";
import SearchBar from "../../utility/searchbar/SearchBar";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

// Main Component includes the main Screen code
function Main() {
  const [customerPoints, setCustomerPoints] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showData, setShowData] = useState({});

  const [headers, setHeaders] = useState(null);

  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("transactionDate");
  const [filterYear, setFilterYear] = useState("");

  useDebounce(searchQuery, 500);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${baseUrl}/api/transactions`);
        const transactions = await response.json();
        if (transactions?.length > 0) {
          const points = aggregatePoints(transactions);
          setCustomerPoints(points);
          setAllData(points);
          setIsLoading(false);
          const keyValues = getHeaders(points);
          setHeaders(keyValues);
        }
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const openModalHandler = (data) => {
    setOpenModal(true);
    setShowData(data);
  };

  function onClose() {
    setOpenModal(false);
  }

  const handleSort = (e) => {
    const sortField = e.target.value;
    setSortField(sortField);
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortField === "totalPoints") {
        return b.totalPoints - a.totalPoints;
      } else if (sortField === "totalSpent") {
        return b.totalSpent - a.totalSpent;
      } else {
        return new Date(a.customerId) - new Date(b.customerId);
      }
    });
    setFilteredData(sortedData);
  };

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className={MainCss.container}>
          <div className={MainCss.searchbarContainer}>
            <div className={MainCss.sortContainer}>
              {/* Sort Dropdown */}
              <select
                className={MainCss.select}
                onChange={(e) => handleSort(e)}
                value={sortField}
              >
                <option value="default">Default</option>
                <option value="totalPoints">Sort by Total Points</option>
                <option value="totalSpent">Sort by Total Spent</option>
              </select>
            </div>
            <SearchBar
              dataset={customerPoints}
              onSearchResult={setFilteredData}
            />
          </div>

          {customerPoints?.length > 0 ? (
            <Table
              headers={headers}
              data={filteredData}
              hasActions={true}
              handleRowClick={openModalHandler}
            />
          ) : (
            <div className={MainCss.noRecords}>No Records Found !</div>
          )}
        </div>
      )}

      {openModal && (
        <CustomModal
          data={showData}
          open={openModal}
          onClose={onClose}
          message="Customer Transaction Details"
        />
      )}
    </>
  );
}

export default Main;
