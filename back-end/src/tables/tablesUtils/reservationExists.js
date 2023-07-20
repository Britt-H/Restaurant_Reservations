const service = require("../../reservations/reservations.services");

//middleware that checks if the reservation exists in the data base
async function reservationExists(req, res, next) {
  //destructure data from body
  let { data = {} } = req.body;
  //extract reservation id from data object
  let reservationId = data.reservation_id;

  //call read from reservations services
  const reservation = await service.read(reservationId);
  //if reservation is found, move to next middleware / route
  if (reservation) {
    return next();
  }
  //else throw error
  return next({
    status: 404,
    message: `Could not find the reservation with the ID ${reservationId}`,
  });
}

module.exports = reservationExists;
