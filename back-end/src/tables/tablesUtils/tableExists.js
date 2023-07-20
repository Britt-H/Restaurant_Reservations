const service = require("../tables.services");

//middleware to check if table exists
async function tableExists(req, res, next) {
  //extract tableId from params
  const tableId = req.params.table_id;
  //call read from tables service
  const table = await service.read(tableId);

  //if table is found, move to next middleware / route
  if (table) {
    return next();
    //else throw error
  } else {
    return next({
      status: 404,
      message: `Could not find table with ID ${tableId}`,
    });
  }
}

module.exports = tableExists;
