const service = require("../../reservations/reservations.services");

//middleware to check if reservation is already booked
async function checkIfReservationIsBooked(
  //destructure reservation_id
  {
    body: {
      data: { reservation_id },
    },
  },
  res,
  next
) {
  //call read function from reservations service to get details
  const reservation = await service.read(reservation_id);
  //check if reservation is booked
  if (reservation.status !== "booked") {
    //if reservation is not booked, error
    return next({
      status: 400,
      message: `Reservation ${reservation_id} is already seated or has already left.`,
    });
  }
  //if reservation is booked, move to next middleware / route
  next();
}

module.exports = checkIfReservationIsBooked;
