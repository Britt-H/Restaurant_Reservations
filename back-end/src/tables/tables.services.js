const knex = require("../db/connection");

//list all tables in database
function list() {
  return knex("tables").select("*");
}

//create new table in database
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

//read a specific table from database
function read(table_id) {
  return knex("tables").select("*").where({ table_id: table_id }).first();
}

//update table in the database when seating a reservation
function seat(updatedtable) {
  return knex("tables")
    .select("*")
    .where({ table_id: updatedtable.table_id })
    .update(updatedtable, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

//update a table in the database when finishing a reservation
function finish(table) {
  return knex("tables")
    .select("*")
    .where({ table_id: table.table_id })
    .update(table, "*");
}

//update a reservation in the database when seating a table
function reservationSeat(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  create,
  list,
  seat,
  read,
  finish,
  reservationSeat,
};