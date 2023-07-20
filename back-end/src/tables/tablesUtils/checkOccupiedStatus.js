const service = require("../tables.services");

//middleware to check if table is occupied
async function checkOccupiedStatus(req, res, next) {
  //extract table id from params
  const { table_id } = req.params;
  //call read from tables service to get table details
  const table = await service.read(Number(table_id));

  //check if table is occupied
  if (table.occupied === true) {
    //if table occupied, error
    return next({ status: 400, message: "Table is currently occupied." });
  }
  //if table is not occupied, move to next middleware / route
  next();
}

module.exports = checkOccupiedStatus;
