const service = require("../tables.services");

async function checkSeatedStatus({ params: { table_id } }, res, next) {
  const table = await service.read(table_id);

  if (!table.reservation_id) {
    return next({ status: 400, message: `Table ${table.table_name} is not occupied at the moment.` });
  }

  next();
}

module.exports = checkSeatedStatus;