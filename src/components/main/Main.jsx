import { useEffect, useState } from "react";
import {
  fetchTransactions,
  aggregatePoints,
} from "../../business-logic/rewardsCalculator";
import MainCss from "./main.module.css";
import Loader from "../../utility/loader/Loader";
import CustomModal from "../../utility/modal/CustomModal";

function Main() {
  const [customerPoints, setCustomerPoints] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showData, setShowData] = useState({});

  useEffect(() => {
    fetchTransactions().then((transactions) => {
      const points = aggregatePoints(transactions);
      setCustomerPoints(points);
      setAllData(points);
      setIsLoading(false);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let inputValue = e.target.value;

    setSearchTerm(inputValue);
    if (inputValue?.length > 0) {
      let searchedValue = customerPoints.filter((customer) =>
        customer.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setCustomerPoints(searchedValue);
    } else {
      setCustomerPoints(allData);
    }
  };

  const openModalHandler = (data) => {
    setOpenModal(true);
    setShowData(data);
  }

  function onClose() {
    setOpenModal(false);
  }

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className={MainCss.container}>
          <h1 className={MainCss.title}>Customer Rewards Dashboard</h1>
          <div className={MainCss.searchbarContainer}>
            <input
              value={searchTerm}
              onChange={handleSearch}
              className={MainCss.searchbar}
              type="text"
              placeholder="Search Customer"
            />
          </div>

          {customerPoints && (
            <table>
              <thead>
                <tr className={MainCss.headers}>

                  <th className={MainCss.cellStyle}>Actions</th>
                  <th className={MainCss.cellStyle}>Customer ID</th>
                  <th className={MainCss.cellStyle}>Customer Name</th>
                  <th className={MainCss.cellStyle}>
                    Total Money Spent ( $ )
                  </th>
                  <th className={MainCss.cellStyle}>Total Points Earned</th>
                </tr>
              </thead>
              <tbody>
                {customerPoints?.map((customer) => (
                  <tr key={customer.customerId} className={MainCss.list}>
                    <td className={MainCss.cellStyle}>
                      <button className={MainCss.viewBtn} onClick={() => openModalHandler(customer)}>
                        View 
                      </button>
                    </td>
                    <td className={MainCss.cellStyle}>{customer.customerId}</td>
                    <td className={MainCss.cellStyle}>{customer.name}</td>
                    <td className={MainCss.cellStyle}>{customer.totalSpent}</td>
                    <td className={MainCss.cellStyle}>
                      {customer.totalPoints}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {openModal && <CustomModal data={showData} open={openModal} onClose = {onClose}/>} 
    </>
  );
}

export default Main;
