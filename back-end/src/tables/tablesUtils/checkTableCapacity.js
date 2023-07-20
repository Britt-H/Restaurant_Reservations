const service = require("../tables.services");
const resService = require("../../reservations/reservations.services");

//middleware to check if table has approriate capacity for reservation
async function checkTableCapacity({ params: { table_id }, body: { data: { reservation_id } } }, res, next) {
  //call read from table services to get table details
  const table = await service.read(table_id);
  //read from reservation service to get reservation details
  const reservation = await resService.read(reservation_id);

  //check if number of people on reservation is greater than table capacity
  if (Number(reservation.people) > table.capacity) {
    //if greater, error
    return next({ status: 400, message: `${table.table_name} does not have sufficient capacity.` });
  }

  //if less than or equal to, move to next middleware / route
  next();
}

module.exports = checkTableCapacity;