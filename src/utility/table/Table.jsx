import React, { useEffect } from "react";
// import TableCss from "../../components/main/main.module.css";
import TableCss from "./table.module.css";
import {
  roundFigure,
  convertCamelCaseToProperName,
} from "../../business-logic/rewardsCalculator";
const Table = (props) => {
  const { headers, data, hasActions, handleRowClick } = props;

  useEffect(() => {
    rowValueRoundOff();
  }, [data]);

  function rowValueRoundOff(rowValue) {
    if (typeof rowValue === "number") {
      return roundFigure(rowValue);
    }

    return rowValue;
  }

  return (
    <>
      {data?.length > 0 && (
        <table>
          <thead>
            <tr className={TableCss.headers}>
              {hasActions && <th className={TableCss.cellStyleView}>Action</th>}

              {convertCamelCaseToProperName(headers)?.map((header) => (
                <th className={header === "Customer Id" ? TableCss.serialNumberCell : TableCss.cellStyle} key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data?.map((row, index) => (
              <tr className={TableCss.list} key={index}>
                {hasActions && (
                  <td className={TableCss.cellStyleView}>
                    <button
                      onClick={() => handleRowClick(row)}
                      className={TableCss.viewBtn}
                    >
                      View
                    </button>
                  </td>
                )}
                {headers?.map((key) => (
                  <td className={key === "customerId" ? TableCss.serialNumberCell : TableCss.cellStyle} key={key}>
                    {rowValueRoundOff(row[key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
