import { updateResStatus } from "../utils/api";

export default function ReservationsComponent({ reservations, loadDashboard }) {
  //handler for cancelling reservation
  function onCancel(e, reservation) {
    e.preventDefault();
    //confirmation popup
    if (window.confirm("Do you want to cancel this reservation?")) {
      updateResStatus(reservation.reservation_id)
        .then(() => loadDashboard()) //reload reservation data
        .catch((error) => console.log("error", error));
    }
  }

  //map through reservations to display list
  let reservationsList = reservations.map((reservation) => {
    const isSeatedOrFinished = ["seated", "cancelled", "finished"].includes(
      reservation.status
    );

    return (
      <div className="card mt-1" key={reservation.reservation_id}>
        <div className="card-body">
          <h5 className="card-title">
            Name: {reservation.first_name} {reservation.last_name}
          </h5>
          <p className="card-text">
            Mobile number: {reservation.mobile_number}
          </p>
          <p className="card-text">
            Date of reservation: {reservation.reservation_date}
          </p>
          <p className="card-text">
            Time of reservation: {reservation.reservation_time}
          </p>
          <p className="card-text">Party Size: {reservation.people} </p>
          <p className="card-text">
            Reservation ID: {reservation.reservation_id}
          </p>
          <p
            className="card-text"
            data-reservation-id-status={reservation.reservation_id}
          >
            Reservation Status: {reservation.status}
          </p>

          {/* hide seat | edit | cancel buttons if status !== booked */}
          {!isSeatedOrFinished ? (
            <a href={`/reservations/${reservation.reservation_id}/seat`}>
              <button className="btn btn-primary w-25 mb-1 ml-1" type="button">
                Seat
              </button>
            </a>
          ) : null}

          {!isSeatedOrFinished && (
            <a href={`/reservations/${reservation.reservation_id}/edit`}>
              <button
                className="btn btn-secondary w-25 mb-1 ml-1"
                type="button"
              >
                Edit
              </button>
            </a>
          )}

          {!isSeatedOrFinished && reservation.status !== "cancelled" && (
            <button
              type="button"
              className="btn btn-danger w-25 mb-1 ml-1"
              data-reservation-id-cancel={reservation.reservation_id}
              onClick={(e) => onCancel(e, reservation)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    );
  });

  return <div>{reservationsList}</div>;
}
