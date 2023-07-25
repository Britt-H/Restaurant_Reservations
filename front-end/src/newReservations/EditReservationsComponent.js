import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import FormComponent from "../formComponent/FormComponent";
import { updateRes, editRes } from "../utils/api";
import { formatAsDate } from "../utils/date-time";

export default function EditReservationsComponent() {
  //set title
  const title = "Edit Your Reservation";
  //get history object to handle nav
  const history = useHistory();
  //get reservation_id from URL parameters
  const params = useParams();
  //state to store reservation data for editing
  const [newReservation, setNewReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  //state to handle errors
  const [errors, setErrors] = useState(null);

  //load reservation data when componenent mounts or reservation_id changes
  useEffect(loadDashboard, [params.reservation_id]);

  //load reservation data
  function loadDashboard() {
    const abortController = new AbortController();
    setErrors(null);
    //get reservation data
    editRes(params.reservation_id, abortController.signal)
      .then((reservation) =>
        //update state with fetched reservation data
        setNewReservation({
          ...reservation,
          reservation_date: formatAsDate(reservation.reservation_date),
        })
      )
      .catch(setErrors);
    return () => abortController.abort();
  }

  //handler for form submission
  const submitHandler = (event, newReservation) => {
    event.preventDefault();
    //format people & date
    newReservation.people = Number(newReservation.people);
    newReservation.reservation_date = formatAsDate(
      newReservation.reservation_date
    );
    //update reservation data based on id
    updateRes(params.reservation_id, newReservation)
      .then(() => {
        //nav back to dashboard using new reservation date
        history.push(`/dashboard/?date=${newReservation.reservation_date}`);
      })
      .catch((errors) => console.log("string", errors));
  };

  //render FormComponent with form data & submitHandler
  return (
    <FormComponent
      submitHandler={submitHandler}
      newReservation={newReservation}
      setNewReservation={setNewReservation}
      errors={errors}
      title={title}
    />
  );
}