//check if reservation exists
const service = require("../reservations.services");

async function reservationExists(req, res, next) {
  //destructure reservationId from params
  const { reservationId } = req.params;

  //call read from services to get reservation
  const reservation = await service.read(reservationId);

  //if reservation is found move to next middleware
  if (reservation) {
    return next();
  }

  //if not found pass error to next middleware
  return next({
    status: 404,
    message: `Could not find the reservation with the id of ${reservationId}`,
  });
}

module.exports = reservationExists;
