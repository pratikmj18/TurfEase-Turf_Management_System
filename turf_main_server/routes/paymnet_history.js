const express = require("express");
const db = require("../db");
const router = express.Router();
const utils = require("../utils");
const jwt = require("jsonwebtoken");
const config = require("../config");
const cryptoJs = require("crypto-js");

//get All payments
router.get("/", (request, response) => {
    const statement = `select * from payment_history `;
    db.pool.execute(statement, (error, result) => {
      response.send(utils.createResult(error, result));
    });
  });

  // get specific user payment
  router.get("/player/:player_id", (request, response) => {
    let statement = `SELECT * FROM payment_history WHERE player_id =?`;
    db.pool.execute(statement, [request.params.player_id], (error, result) => {
      response.send(utils.createResult(error, result));
    });
  });


  // get specific turf payment
  router.get("/turflist/:turf_id", (request, response) => {
    let statement = `SELECT * FROM payment_history WHERE turf_id =?`;
    db.pool.execute(statement, [request.params.turf_id], (error, result) => {
      response.send(utils.createResult(error, result));
    });
  });

//insert payments
router.post("/", (request, response) => {
    const { booking_id, player_id, turf_id, amount, payment_date, payment_method, transaction_id, status } = request.body;
    const statement = `insert into payment_history ( booking_id, player_id, turf_id, amount, payment_date, payment_method, transaction_id, status ) values (?,?,?,?,?,?,?,?)`;
    db.pool.execute(statement, [ booking_id, player_id, turf_id, amount, payment_date, payment_method, transaction_id, status], (error, result) => {
      response.send(utils.createResult(error, result));
    });
  });

  module.exports = router;