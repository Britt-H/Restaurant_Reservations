const service = require("../tables.services");

//middleware to check if a table is currently seated
async function checkSeatedStatus({ params: { table_id } }, res, next) {
  //call read function from tables service to get table details
  const table = await service.read(table_id);

  //check if table is currently occupied by a reservation
  if (!table.reservation_id) {
    //if table is not occupied, error
    return next({ status: 400, message: `Table ${table.table_name} is not occupied at the moment.` });
  }
  //if table is occupied, move to next middleware / route
  next();
}

module.exports = checkSeatedStatus;