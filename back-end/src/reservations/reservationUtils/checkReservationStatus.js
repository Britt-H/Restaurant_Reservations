const service = require("../reservations.services");

//check reservation status

async function checkReservationStatus(req, res, next) {
  //destructure status from data
  let { status } = req.body.data;

  //get current reservation based on reservation_id
  let current = await service.read(req.params.reservation_id);

  //check if status is valid
  if (
    status !== "booked" &&
    status !== "seated" &&
    status !== "finished" &&
    status !== "cancelled"
  ) {
    return next({
      status: 400,
      message: `Status ${status} is not a valid status`,
    });
  }

  //check if current reservation is finished
  if (current.status == "finished") {
    return next({
      status: 400,
      message: `Reservation ${current.reservation_id} is alread finished`,
    });
  }

  //move to next middleware after passing all checks
  next();
}

module.exports = checkReservationStatus;
