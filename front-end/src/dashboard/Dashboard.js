import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsComponent from "./ReservationsComponent";
import ListTables from "./ListTables";
import useQuery from "../utils/useQuery";
import { today, next, previous } from "../utils/date-time";
import { useHistory } from "react-router-dom"
import moment from "moment";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  //Create State variables for reservations, reservations error, & table data
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);

  //get date parameter from URL or use todays date
  const query = useQuery();
  const date = query.get("date") || today();

  //get History object to handle navigation
  const history = useHistory();

  //load reservations based on selected date
  useEffect(loadDashboard, [date]);
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    //get reservations for the selected date
    listReservations({ date }, abortController.signal)
      .then(setReservations)  //update state with fetched data
      .catch(setReservationsError);
    return () => abortController.abort(); //cancel request
  }

  //load tables data when
  useEffect(loadTables, []);
  function loadTables() {
    const abortController = new AbortController();
    //get tables data
    listTables(abortController.signal)
      .then(setTables) //update state with fetched data
    return () => abortController.abort();  //cancel request
  }

  return (
    <main>
      <h2>Dashboard</h2>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {moment(date).format("ddd MMMM Do, YYYY")}</h4>
      </div>
      <div>
      {reservations.length !== 0 ? (
      <ReservationsComponent reservations={reservations} 
      loadDashboard={loadDashboard}/>) : 
      (
          `There are no reservations today`
        )}
        </div>
      <button className="btn btn-secondary" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
      <button className="btn btn-primary ml-1" onClick={() => history.push(`/dashboard?date=${today()}`)}>Today</button>
      <button className="btn btn-warning ml-1" onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
      <ListTables tables={tables} loadTables={loadTables} loadDashboard={loadDashboard}/>
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;