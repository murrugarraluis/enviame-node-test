const {faker} = require('@faker-js/faker');

function generateQuotations(userCount, coverageCount, priceCount, count) {
  const quotations = [];
  const status = ["CREADA", "RESERVA", "RESERVA_CANCELADA"]
  for (let i = 0; i < count; i++) {

    const randomStatus = status[Math.floor(Math.random() * status.length)];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const travelDate = faker.date.between(new Date(currentYear, currentMonth, 1), new Date(currentYear, currentMonth + 1, 0));

    quotations.push({
      userId: faker.datatype.number({min: 1, max: userCount}),
      coverageId: randomStatus !== "creada" ? faker.datatype.number({min: 1, max: coverageCount}) : null,
      priceId: randomStatus !== "creada" ? faker.datatype.number({min: 1, max: priceCount}) : null,
      travelDate,
      passengerCount: faker.datatype.number({min: 6, max: 10}),
      status: randomStatus,
    });
  }
  return quotations;
}

module.exports = {generateQuotations};