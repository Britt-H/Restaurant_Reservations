//check reservation time lands within open hours

async function checkTime(req, res, next) {
  //destructure data from body
  const { data = {} } = req.body;
  //get reservation time
  let res_time = data.reservation_time;
  //split time on colon
  res_time = res_time.split(":");
  //convert time to decimal
  res_time = Number(res_time.join("."));

  //check that time lands between 10:30a & 9:30p
  if (res_time <= 10.3 || res_time >= 21.3) {
    //throw error if outside of range
    return next({
      status: 400,
      message: "Reservation_time must be after 10:30AM and before 9:30PM",
    });
  }

  //move to next middleware after passing all checks
  next();
}

module.exports = checkTime;
