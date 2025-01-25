// takes transaction amount and returns reward points for given amount

export const calculatePoints = (amount) => {
  try {
    if (typeof amount !== "number" || amount < 0) {
      throw new Error("Invalid amount. Amount must be a positive number.");
    }

    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2;
      points += 50;
    } else if (amount > 50) {
      points += amount - 50;
    }
    return points;
  } catch (error) {
    return 0;
  }
};


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

// this function provides detailed calculation of total money spent, total rward points of each customer and returns an array of customers with all details
export const aggregatePoints = (transactions) => {
  try {
    if (!Array.isArray(transactions)) {
      throw new Error("Invalid transactions data. Must be an array.");
    }

    let pointsAndSpending = transactions.reduce((acc, transaction) => {
      try {
        const month = new Date(transaction.transactionDate).getMonth() + 1;
        const customerId = transaction.customerId;
        const amount = transaction.amount;
        const points = calculatePoints(amount);

        if (!acc[customerId]) {
          acc[customerId] = {
            customerId,
            customerName: transaction.customerName,
            totalPoints: 0,
            totalSpent: 0,
            monthlyPoints: {},
            monthlySpent: {},
          };
        }

        if (!acc[customerId].monthlyPoints[month]) {
          acc[customerId].monthlyPoints[month] = 0;
        }
        if (!acc[customerId].monthlySpent[month]) {
          acc[customerId].monthlySpent[month] = 0;
        }

        acc[customerId].monthlyPoints[month] += points;
        acc[customerId].monthlySpent[month] += amount;

        acc[customerId].totalPoints += points;
        acc[customerId].totalSpent += amount;
      } catch (error) {
        console.error(
          `Error processing transaction for customer ID ${transaction.customerId}:`,
          error.message
        );
      }

      return acc;
    }, {});

    const resultArray = Object.values(pointsAndSpending);
    return resultArray;
  } catch (error) {
    return [];
  }
};

export const roundFigure = (amount) => {
  return parseFloat(amount.toFixed(2));
};

// export const getHeaders = (data) => {
//   if (data.length > 0) {
//     return Object.keys(data[0]);
//   }
//   return [];
// };
export const getHeaders = (data) => {
  if (data.length > 0) {
    return Object.keys(data[0]).filter(
      (key) => typeof data[0][key] != 'object'
    );
  }
  return [];
};


export const convertCamelCaseToProperName = (headers) => {
  return headers.map(header => {
    // Replace any uppercase letter with a space followed by the letter itself
    let properName = header.replace(/([A-Z])/g, ' $1');
    // Capitalize the first letter and return the transformed string
    return properName.charAt(0).toUpperCase() + properName.slice(1);
  });
};