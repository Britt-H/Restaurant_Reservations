const service = require("../../reservations/reservations.services")

async function checkIfReservationIsBooked({ body: { data: { reservation_id } } }, res, next) {
    const reservation = await service.read(reservation_id);
    if (reservation.status !== "booked") {
      return next({ status: 400, message: `Reservation ${reservation_id} is already seated or has already left.` });
    }
    next();
  }

module.exports = checkIfReservationIsBooked;