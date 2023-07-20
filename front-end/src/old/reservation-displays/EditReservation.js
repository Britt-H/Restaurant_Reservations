// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import { getReservation } from "../../utils/api";
// import ReservationForm from "./ReservationForm"
// import formatReservationDate from "../../utils/format-reservation-date";
// import formatReservationTime from "../../utils/format-reservation-time";

// function EditReservation({setDate}){
//     const [reservationForm,setReservationForm]=useState(<div></div>);
//     const params = useParams();
//     async function LoadReservation(){
//         const abortContoller = new AbortController();
//         await getReservation(params.reservation_id,abortContoller.signal)
//             .then(formatReservationDate)
//             .then(formatReservationTime)
//             .then((value)=>setReservationForm(<ReservationForm type="update" setDate={setDate} reservation={value}/>))
//     }

//     useEffect(LoadReservation,[]);

//     return(<div>
//         <h1 className="text-center">Edit Reservation</h1>
//         {reservationForm}
//     </div>)
// }

// export default EditReservation;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getReservation } from "../../utils/api";
import ReservationForm from "./ReservationForm"
import formatReservationDate from "../../utils/format-reservation-date";
import formatReservationTime from "../../utils/format-reservation-time";

function EditReservation({ setDate }) {
  const [reservationForm, setReservationForm] = useState(null); // Initialize with null instead of an empty div
  const params = useParams();

  useEffect(() => {
    let isMounted = true; // Add a flag to track component's mounting status

    const LoadReservation = async () => {
      const abortController = new AbortController();

      try {
        const reservation = await getReservation(params.reservation_id, abortController.signal);
        const formattedReservation = await formatReservationDate(reservation);
        const reservationWithTime = await formatReservationTime(formattedReservation);

        if (isMounted) {
          setReservationForm(
            <ReservationForm type="update" setDate={setDate} reservation={reservationWithTime} />
          );
        }
      } catch (error) {
        // Handle any error that occurred during the async operations
        console.error(error);
      }
    };

    LoadReservation();

    return () => {
      isMounted = false; // Cleanup function to update the mounting status when component unmounts
    };
  }, [params.reservation_id, setDate]); // Add params.reservation_id and setDate to dependency array

  return (
    <div>
      <h1 className="text-center">Edit Reservation</h1>
      {reservationForm}
    </div>
  );
}

export default EditReservation;
