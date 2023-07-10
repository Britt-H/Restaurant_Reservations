//check reservation date middleware

async function checkDate(req, res, next) {
  let { data = {} } = req.body;
  let res_date = new Date(data.reservation_date);
  let current = new Date();
  let future = true;

  //check if date is a Tuesday, throw error
  if (res_date.getUTCDay() == 2) {
    return next({
      status: 400,
      message:
        "Reservation_date can not be a tuesday because the store is closed",
    });
  }

  //check if date is in the past
  if (current.getFullYear() > res_date.getFullYear()) {
    future = false;
  } else if (current.getFullYear() == res_date.getFullYear()) {
    if (current.getTime() > res_date.getTime()) {
      future = false;
    }
  }

  //date is not in the future, throw error
  if (!future) {
    return next({
      status: 400,
      message: "Reservation must take place in the future",
    });
  }

  //move to next middleware after passing all checks
  next();
}

module.exports = checkDate;
