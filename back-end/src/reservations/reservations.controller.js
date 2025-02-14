const service = require("./reservations.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const mergeSort = require("../utils/mergeSort")
const hasProperties = require("../utils/hasProperties.js")
const reservationExists = require("./reservationUtils/reservationExists");
const checkDataTypes = require("./reservationUtils/checkDataTypes");
const compareRT = require("./reservationUtils/compares");
const checkDate = require("./reservationUtils/checkDate");
const checkTime = require("./reservationUtils/checkTime");
const checkReservationStatus = require("./reservationUtils/checkReservationStatus")
const reservationExists2 = require("./reservationUtils/reservationExists2")


async function list(req, res) {
  const {date,mobile_number} = req.query;
  data = [];
  if(date){
     data = await service.list({reservation_date: date},{status: "cancelled"},{status: "finished"});
  }if(mobile_number){
    data = await service.list();
    data = data.filter((res)=>res.mobile_number.includes(mobile_number))
  }
  let sortedData = mergeSort(compareRT, data)
  return res.status(200).json({data:sortedData});
}

async function create(req,res){
  const newReservation = await service.create(req.body.data);
  res.status(201).json({data: newReservation});
}

async function destroy(req,res){
  const {reservationId} = req.params;
  const deletedReservation = await(service.destroy(reservationId));
  res.status(204).json({data:deletedReservation});
}

async function update(req,res){
  const {reservationId} = req.params;
  const reservation = req.body.data;
  const updatedReservation = await service.update({...reservation,reservation_id:reservationId});
  res.status(200).json({data: updatedReservation});
}

async function read(req,res){
  const {reservationId} = req.params;
  const reservation = await service.read(reservationId);
  res.status(200).json({data:reservation});
}

async function nextStatus(req,res,next){
  const {status} = req.body.data;
  const reservation = await service.read(req.params.reservation_id);
  let updated = {...reservation,status:status}
  let data = await service.update(updated);
  res.json({data});
}

module.exports = {
  list:asyncErrorBoundary(list),
  read:[
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(read)],
  create:[
    asyncErrorBoundary(hasProperties("first_name","last_name","people","reservation_time","reservation_date", "mobile_number")),
    asyncErrorBoundary(checkDataTypes),
    asyncErrorBoundary(checkDate),
    asyncErrorBoundary(checkTime),
    asyncErrorBoundary(create)],
  delete:[
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(destroy)],
  update:[
    asyncErrorBoundary(hasProperties("first_name","last_name","people","reservation_time","reservation_date", "mobile_number")),
    asyncErrorBoundary(checkDataTypes),
    asyncErrorBoundary(checkDate),
    asyncErrorBoundary(checkTime),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(update)],
  updateStatus:[
    asyncErrorBoundary(reservationExists2),
    asyncErrorBoundary(checkReservationStatus),
    asyncErrorBoundary(nextStatus)]
};