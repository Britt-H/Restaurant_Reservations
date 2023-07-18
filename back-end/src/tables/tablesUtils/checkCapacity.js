function checkCapacity(req, res, next) {
    const { data = {} } = req.body;
    const capacity = data.capacity;
  
    if (typeof capacity !== "number" || capacity < 1) {
      return next({ status: 400, message: "Table capacity must be a number greater than or equal to 1." });
    }
  
    next();
  }
  
  module.exports = checkCapacity;