import React, { useEffect } from "react";
import MainCss from "../../components/main/main.module.css";
import {
  roundFigure,
  convertCamelCaseToProperName,
} from "../../business-logic/rewardsCalculator";
const Table = (props) => {
  const { headers, data, hasActions, handleRowClick } = props;
  console.log("headers", headers);

  useEffect(() => {
    rowValueRoundOff();
  }, [data]);

  function rowValueRoundOff(rowValue) {
    if(typeof rowValue === "number") {
      return roundFigure(rowValue);
    }

    return rowValue;
  }

  return (
    <>
      {data?.length > 0 && (
        <table>
          <thead>
            <tr className={MainCss.headers}>
              {hasActions && <th className={MainCss.cellStyle}>Action</th>}

              {convertCamelCaseToProperName(headers)?.map((header) => (
                <th className={MainCss.cellStyle} key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data?.map((row, index) => (
              <tr className={MainCss.list} key={index}>
                {hasActions && (
                  <td className={MainCss.cellStyle}>
                    <button
                      onClick={() => handleRowClick(row)}
                      className={MainCss.viewBtn}
                    >
                      View
                    </button>
                  </td>
                )}
                {headers?.map((key) => (
                  <td className={MainCss.cellStyle} key={key}>
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
