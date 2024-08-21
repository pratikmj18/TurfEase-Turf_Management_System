const express = require("express");
const db = require("../db");
const router = express.Router();
const utils = require("../utils");
const jwt = require("jsonwebtoken");
const config = require("../config");
const cryptoJs = require("crypto-js");

//get All booking
router.get("/", (request, response) => {
  const statement = `select * from turf_booking`;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//for specific playerbooking
router.get("/player/:player_id", (request, response) => {
  let statement = `SELECT 
    tb.*,
    p.name,
    p.email
FROM 
    turf_booking tb
INNER JOIN 
    player p
ON 
    tb.player_id = p.player_id
WHERE 
    p.player_id = ${request.params.player_id};
`;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//for specific turf
router.get("/turflist/:turf_id", (request, response) => {
  const { turf_id } = request.params;
  let statement = `SELECT 
    tb.*,
    s.name
FROM 
    turf_booking tb
INNER JOIN 
    turflist s
ON 
    tb.turf_id = s.turf_id
WHERE 
    s.turf_id = ?;
`;
  db.pool.execute(statement, [turf_id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//for specific owner
router.get("/owner/:username", (request, response) => {
  let username = request.params.username; // get username from URL parameter
  let statement = `SELECT t.name, tb.* 
                   FROM turflist t
                   INNER JOIN owner o ON o.owner_id = t.owner_id 
                   INNER JOIN turf_booking tb ON tb.turf_id = t.turf_id
                   WHERE o.username = ?`;

  db.pool.execute(statement, [username], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//Add Turf_booking
router.post("/", (request, response) => {
  const {
    turf_booking_date,
    turf_booking_time,
    remark,
    booking_status,
    turf_id,
    player_id,
  } = request.body;
  let statement = `  INSERT INTO turf_booking (turf_booking_date, turf_booking_time, remark, booking_status, turf_id, player_id) 
    VALUES (?, ?, ?, ?, ?, ?)`;
  db.pool.execute(
    statement,
    [
      turf_booking_date,
      turf_booking_time,
      remark,
      booking_status,
      turf_id,
      player_id,
    ],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

//update turf_booking status by owner
router.put("/:booking_id", (request, response) => {
  const { booking_id } = request.params;
  const { booking_status } = request.body;
  let statement = `update turf_booking set booking_status =? where booking_id =?`;

  db.pool.execute(
    statement,
    [
      booking_status,
     booking_id,
    ],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

module.exports = router;
