import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { getReservation, listTables, seatTable } from "../../utils/api";
import hasValidTableCapacity from "../reservation-helper-functions/hasValidTableCapacity";
import tableNotOccupied from "../reservation-helper-functions/tableNotOccupied";
import ErrorAlert from "../../layout/ErrorAlert";

function SeatReservation({ refreshTables, tab, setDate }) {
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState(1);
  const [inputError, setInputError] = useState(null);
  const reservationId = useParams().reservation_id;
  const history = useHistory();

  async function loadTables() {
    const abortController = new AbortController();
    try {
      await listTables(abortController.signal).then(setTables);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted");
      } else {
        throw error;
      }
    }
    return () => abortController.abort();
  }

  useEffect(() => {
    loadTables();
  }, []);

  const changeHandler = (event) => {
    setTableId(event.target.value);
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    let hasCap = await hasValidTableCapacity(tableId, reservationId);
    let tableNotOccupiedValue = await tableNotOccupied(tableId);
    let reservation = await getReservation(reservationId);
    if (tableNotOccupiedValue === true && hasCap === true) {
      const abortController = new AbortController();
      let dat = reservation.reservation_date;
      dat = dat.split("T");
      dat = dat[0];
      await seatTable(tableId, reservationId, abortController.signal);
      history.push({ pathname: "/dashboard", search: `date=${dat}` });
      refreshTables(!tab);
      setDate(dat);
    } else {
      if (hasCap === true) {
        let error = new Error(tableNotOccupiedValue);
        setInputError(error);
      } else {
        let error = new Error(hasCap);
        setInputError(error);
      }
    }
  }

  const cancelHandler = (event) => {
    history.goBack();
  }

  return (
    <div>
      <h1 className="text-center">Seat Reservation</h1>
      <div className="d-md-flex justify-content-center">
        <form onSubmit={submitHandler}>
          <div className="row m-2 justify-content-aroundr">
            <label className="mr-1">Table Name:</label>
            <select name="table_id" onChange={changeHandler}>
              {tables.map((table) => (
                <option value={table.table_id} key={table.table_id}>
                  {table.table_name} - {table.capacity}
                </option>
              ))}
            </select>
          </div>
          <div className="row m-2 justify-content-around">
            <button className="btn btn-outline-dark" onClick={cancelHandler}>
              Cancel
            </button>
            <button className="btn btn-outline-dark" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <ErrorAlert error={inputError} />
    </div>
  );
}

export default SeatReservation;