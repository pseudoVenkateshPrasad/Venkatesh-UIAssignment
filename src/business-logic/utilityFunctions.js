// takes month number and returns String representing month
export const getMonthName = (monthNumber) => {
  try {
    if (
      typeof monthNumber !== "number" ||
      monthNumber < 1 ||
      monthNumber > 12
    ) {
      throw new Error("Invalid month number. Must be between 1 and 12.");
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthNumber - 1];
  } catch (error) {
    return "Invalid month";
  }
};

// round figure the value of the total amount upto 2 decimal place
export const roundFigure = (amount) => {
  return parseFloat(amount.toFixed(2));
};


// gets Headers array from the api response array
export const getHeaders = (data) => {
  if (data.length > 0) {
    return Object.keys(data[0]).filter(
      (key) => typeof data[0][key] != "object"
    );
  }
  return [];
};

// converts the given string of camel case to proper name
export const convertCamelCaseToProperName = (headers) => {
  return headers.map((header) => {
    let properName = header.replace(/([A-Z])/g, " $1");
    return properName.charAt(0).toUpperCase() + properName.slice(1);
  });
};
