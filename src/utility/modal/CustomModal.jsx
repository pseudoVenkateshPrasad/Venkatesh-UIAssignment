import React, { useState, useEffect } from "react";
import modalCss from "./custommodal.module.css";
import {
  getMonthName,
  roundFigure,
} from "../../business-logic/rewardsCalculator";

const CustomModal = ({ data, open, onClose, message }) => {
  const [isOpen, setIsOpen] = useState(true);
  const {
    monthlySpent,
    monthlyPoints,
    customerId,
    customerName,
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
              <h3 className={modalCss.title}>{message}</h3>

              {data && (
                <div className={modalCss.metaData}>
                  <span>
                    <b>Customer Id - </b>  {customerId}
                  </span>
                  <span>
                    <b>Customer Name - </b>  {customerName}
                  </span>
                  <span>
                    <b>Total Transaction - </b>  {roundFigure(totalSpent)} $
                  </span>
                  <span>
                    <b>Total Reward Points - </b>  {roundFigure(totalPoints)}
                  </span>
                </div>
              )}

              {data && (
                <div>
                  <table>
                    <thead>
                      <tr className={modalCss.headers}>
                        <th className={modalCss.cellStyle}>Month</th>
                        <th className={modalCss.cellStyle}>
                          Amount Spent ( $ )
                        </th>
                        <th className={modalCss.cellStyle}>Reward Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlySpent &&
                        Object.keys(monthlySpent).map((item) => {
                          const monthName = getMonthName(parseInt(item));
                          return (
                            <tr className={modalCss.list} key={item}>
                              <td className={modalCss.cellStyle}>
                                {monthName}
                              </td>
                              <td className={modalCss.cellStyle}>
                                {roundFigure(monthlySpent[item])}
                              </td>
                              <td className={modalCss.cellStyle}>
                                {roundFigure(monthlyPoints[item])}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModal;
