import { updateResId } from "../utils/api";

export default function ListTables({ tables, loadTables, loadDashboard }) {
  //finish button handler
  function clickHandler(event) {
    let tableId = event.target.value;
    tableId = Number(tableId);
    if (window.confirm("Is this table ready to seat new guests?") === true) {
      //update reservation_id
      updateResId(tableId)
        .then(() => loadTables()) //reload tables
        .then(() => loadDashboard()) //reload reservations data
        .catch((error) => console.log("error", error));
    }
  }

  //map through tables to display list
  const list = tables.map((table) => {
    return (
      <div className="card" key={table.table_id}>
        <div className="card-body">
          <h5 className="card-title">Table: {table.table_name}</h5>
          <p className="card-text">Capacity: {table.capacity}</p>
          <p>
            <span data-table-id-status={table.table_id}>
              Status: {table.reservation_id ? "Occupied" : "Free"}
            </span>
          </p>
          {table.reservation_id ? (
            <button
              value={table.table_id}
              data-table-id-finish={table.table_id}
              type="button"
              className="btn btn-danger"
              onClick={clickHandler}
            >
              Finish
            </button>
          ) : null}
        </div>
      </div>
    );
  });
  return <>{list}</>;
}
