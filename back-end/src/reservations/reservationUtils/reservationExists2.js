//alternate check if reservation exists
const service = require("../reservations.services");

async function reservationExists2(req, res, next) {
  //destructure reservationId from params
  const { reservation_id } = req.params;

  //call read from services to get reservation
  const reservation = await service.read(reservation_id);

  //if reservation is found move to next middleware
  if (reservation) {
    return next();
  }

  //if not found pass error to next middleware
  return next({
    status: 404,
    message: `Could not find the reservation with the id of ${reservation_id}`,
  });
}

module.exports = reservationExists2;
