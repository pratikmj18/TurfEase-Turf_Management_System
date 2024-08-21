const express = require("express");
const db = require("../db");
const router = express.Router();
const utils = require("../utils");
const jwt = require("jsonwebtoken");
const config = require("../config");
const cryptoJs = require("crypto-js");

//get All turf
router.get("/", (request, response) => {
  const statement = `select * from turflist`;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//Add Turf
router.post("/", (request, response) => {
  const { name, location, pricing, owner_id } = request.body;
  let statement = `insert into turflist(name, location, pricing, owner_id) values(?,?,?,?)`;
  db.pool.execute(
    statement,
    [name, location, pricing, owner_id],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

//Update Turf
router.put("/:turf_id", (request, response) => {
  const { turf_id } = request.params;
  const { name, location, pricing } = request.body;
  let statement = `update turflist set name=?, location=?, pricing=? where turf_id=?`;
  db.pool.execute(
    statement,
    [name, location, pricing, turf_id],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

//delete turf
router.delete("/:turf_id", (request, response) => {
  const { turf_id } = request.params;

  let statement = `delete from turflist where turf_id =?`;

  db.pool.execute(statement, [turf_id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});


module.exports = router;