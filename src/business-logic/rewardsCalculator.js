import { ALLTRANSACTIONS } from "../mockdata/data.js";
export const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2;
    points += 50;
  } else if (amount > 50) {
    points += amount - 50;
  }
  return points;
};

export const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ALLTRANSACTIONS);
    }, 1000);
  });
};

export const getMonthName = (monthNumber) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[monthNumber - 1];
};


export const aggregatePoints = (transactions) => {
  let pointsAndSpending = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.transactionDate).getMonth() + 1;
    const customerId = transaction.customerId;
    const amount = transaction.amount;
    const points = calculatePoints(amount);

    if (!acc[customerId]) {
      acc[customerId] = {
        customerId,
        name: transaction.customerName,
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

    return acc;
  }, {});

  const resultArray = Object.values(pointsAndSpending);
  return resultArray;
};
