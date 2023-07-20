//middleware to ccheck capacity of table before creating/updating
function checkCapacity(req, res, next) {
  //destructure data property or set to empty object
  const { data = {} } = req.body;
  //extract capacity from data object
  const capacity = data.capacity;

  //check capacity is not a number or less than 1
  if (typeof capacity !== "number" || capacity < 1) {
    return next({
      status: 400,
      message: "Table capacity must be a number greater than or equal to 1.",
    });
  }

  //valid capacity move to next middleware or route
  next();
}

module.exports = checkCapacity;
