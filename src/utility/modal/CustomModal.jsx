import React, { useState, useEffect } from "react";
import modalCss from "./custommodal.module.css";
import { getMonthName } from "../../business-logic/rewardsCalculator";

const CustomModal = ({ data, open, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const {
    monthlySpent,
    monthlyPoints,
    customerId,
    name,
    totalPoints,
    totalSpent,
  } = data;

  return (
    <>
      {isOpen && (
        <div className={modalCss.modalOverlay}>
          <div className={modalCss.modalContent}>
            <span className={modalCss.closeButton} onClick={onClose}>
              &times;
            </span>

            <div className={modalCss.content}>
              <h3 className={modalCss.title}>Customer Transaction Details</h3>

              <div className={modalCss.metaData}>
                <span>Customer Id - {customerId}</span>
                <span>Customer Name - {name}</span>
                <span>Total Transaction - {totalSpent} $</span>
                <span>Total Reward Points - {totalPoints}</span>
              </div>
              <div>
                <table>
                  <thead>
                    <tr className={modalCss.headers}>
                      <th className={modalCss.cellStyle}>Month</th>
                      <th className={modalCss.cellStyle}>Amount Spent ( $ )</th>
                      <th className={modalCss.cellStyle}>Reward Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlySpent &&
                      Object.keys(monthlySpent).map((item) => {
                        const monthName = getMonthName(parseInt(item));
                        return (
                          <tr className={modalCss.list} key={item}>
                            <td className={modalCss.cellStyle}>{monthName}</td>
                            <td className={modalCss.cellStyle}>
                              {monthlySpent[item]}
                            </td>
                            <td className={modalCss.cellStyle}>
                              {monthlyPoints[item]}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModal;
