import { useHistory } from "react-router";
import { useState } from "react";
import { createRes } from "../utils/api";
import FormComponent from "../formComponent/FormComponent";

export default function NewReservationsComponent() {
  //set form title
  const title = "Create Your Reservation";
  //get history to handle nav
  const history = useHistory();
  //state to handle errors
  const [error, setError] = useState(null);
  //state to store new revervation data
  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  //form submission handler
  const submitHandler = (event) => {
    event.preventDefault();
    reservation.people = Number(reservation.people);
    //create the reservation
    createRes(reservation)
      .then(() => {
        //navigate to dashboard using new reservation date
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      })
      .catch(setError);
  };

  //render FormComponent with form data & submitHandler
  return (
    <FormComponent
      submitHandler={submitHandler}
      newReservation={reservation}
      setNewReservation={setReservation}
      errors={error}
      title={title}
    />
  );
}
