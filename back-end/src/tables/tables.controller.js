const service = require("./tables.services");
const resService = require("../reservations/reservations.services")
const hasProperties = require("../utils/hasProperties");
const mergeSort = require("../utils/mergeSort");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const checkCapacity = require("./tablesUtils/checkCapacity");
const checkIfReservationIsBooked = require("./tablesUtils/checkIfReservationIsBooked")
const checkOccupiedStatus = require("./tablesUtils/checkOccupiedStatus");
const checkTableName = require("./tablesUtils/checkTableName");
const checkSeatedStatus = require("./tablesUtils/checkSeatedStatus")
const checkTableCapacity = require("./tablesUtils/checkTableCapacity")
const compare = require("./tablesUtils/compare");
const reservationExists = require("./tablesUtils/reservationExists");
const tableExists = require("./tablesUtils/tableExists");


async function list(req, res, next) {
    const data = await service.list();
    const sortedData = mergeSort(compare, data);
    res.json({ data: sortedData });
  }
  

async function create(req, res, next) {
  const tableData = { ...req.body.data, occupied: false };
  const createdTable = await service.create(tableData);
  res.status(201).json({ data: createdTable });
}

async function seat(req, res, next) {
    const { data = {} } = req.body;
    const { table_id } = req.params;
  
    const table = await service.read(table_id);
    const updatedTable = { ...table, reservation_id: data.reservation_id, occupied: true };
    const seatedTable = await service.seat(updatedTable);
  
    res.json({ data: seatedTable });
  }

  async function seatReservation(req, res, next) {
    const { reservation_id } = req.body.data;
    const reservation = await resService.read(reservation_id);
    const updatedReservation = { ...reservation, status: "seated" };
    await service.reservationSeat(updatedReservation);
    next();
  }

  async function finishReservation(req, res, next) {
    const { table_id } = req.params;
    const table = await service.read(table_id);
    const reservation = await resService.read(table.reservation_id);
    const updatedReservation = { ...reservation, status: "finished" };
    await resService.update(updatedReservation);
    next();
  }

async function finish(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  const updatedTable = await service.finish({ ...table, reservation_id: null, occupied: false });
  res.json({ data: updatedTable });
}

module.exports ={
    list:[asyncErrorBoundary(list)],
    create:[
        asyncErrorBoundary(hasProperties("table_name","capacity")),
        asyncErrorBoundary(checkCapacity),
        asyncErrorBoundary(checkTableName),
        asyncErrorBoundary(create)],
    seat:[
        asyncErrorBoundary(hasProperties("reservation_id")),
        asyncErrorBoundary(reservationExists),
        asyncErrorBoundary(checkOccupiedStatus),
        asyncErrorBoundary(checkTableCapacity),
        asyncErrorBoundary(checkIfReservationIsBooked),
        asyncErrorBoundary(seatReservation),
        asyncErrorBoundary(seat)
    ],
    finish:[
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(checkSeatedStatus),
        asyncErrorBoundary(finishReservation),
        asyncErrorBoundary(finish)],
};