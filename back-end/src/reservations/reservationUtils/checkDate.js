//check reservation date middleware

async function checkDate(req, res, next) {
  let { reservation_date, reservation_time } = req.body.data;
  let res_date = new Date(`${reservation_date} ${reservation_time}`);
  let current = new Date();

  //check if date is a Tuesday, throw error
  if (res_date.getUTCDay() == 2) {
    return next({
      status: 400,
      message:
        "Reservation_date can not be a tuesday because the store is closed",
    });
  }

    // Check if date is in the past
    if (res_date < current) {
      return next({
        status: 400,
        message: "Reservation must take place in the future",
      });
    }

  //move to next middleware after passing all checks
  next();
}

module.exports = checkDate;
