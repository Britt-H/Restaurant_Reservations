const service = require("../tables.services");
const resService = require("../../reservations/reservations.services");

async function checkTableCapacity({ params: { table_id }, body: { data: { reservation_id } } }, res, next) {
  const table = await service.read(table_id);
  const reservation = await resService.read(reservation_id);

  if (Number(reservation.people) > table.capacity) {
    return next({ status: 400, message: `${table.table_name} does not have sufficient capacity.` });
  }

  next();
}

module.exports = checkTableCapacity;