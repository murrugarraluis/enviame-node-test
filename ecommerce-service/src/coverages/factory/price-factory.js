const { faker } = require('@faker-js/faker');

function generatePrices(coverageCount, count) {
  const prices = [];
  for (let i = 0; i < count; i++) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // Ensure startDate is the first day of the current month
    const startDate = new Date(currentYear, currentMonth - 1, 1);

    // Ensure endDate is 3 months after the startDate
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 3);

    prices.push({
      coverageId: faker.datatype.number({ min: 1, max: coverageCount }),
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      amount: faker.finance.amount(500, 1000, 2),
      currency: 'PEN',
    });
  }
  return prices;
}

module.exports = { generatePrices };