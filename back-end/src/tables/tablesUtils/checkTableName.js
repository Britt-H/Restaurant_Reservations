function checkTableName(req, res, next) {
    const { data = {} } = req.body;
    const tableName = data.table_name;
  
    if (tableName.length < 2) {
      return next({ status: 400, message: "table_name must be 2 or more characters." });
    }
  
    next();
  }
  
  module.exports = checkTableName;