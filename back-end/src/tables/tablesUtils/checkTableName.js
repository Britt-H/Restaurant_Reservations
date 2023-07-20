//middleware to check if table name is at least 2 characters long
function checkTableName(req, res, next) {
    //destructure data from body
    const { data = {} } = req.body;
    //extract tablename from data object
    const tableName = data.table_name;
  
    //check if table name is less than two characters
    if (tableName.length < 2) {
      //throw error if less than 0
      return next({ status: 400, message: "table_name must be 2 or more characters." });
    }
  
    //if table name is at least 2 characters long, move to next middleware / route
    next();
  }
  
  module.exports = checkTableName;