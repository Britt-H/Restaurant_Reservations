const service = require("../tables.services");

// Checks if table exists
async function tableExists(req, res, next) {
  const tableId = req.params.table_id;
  const table = await service.read(tableId);

  if (table) {
    return next();
  } else {
    return next({ status: 404, message: `Could not find table with ID ${tableId}` });
  }
}

module.exports = tableExists;