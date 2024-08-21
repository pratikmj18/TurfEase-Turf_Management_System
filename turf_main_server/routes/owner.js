const express = require("express");
const db = require("../db");
const router = express.Router();
const utils = require("../utils");
const jwt = require("jsonwebtoken");
const config = require("../config");
const cryptoJs = require("crypto-js");

//get All Owner
router.get("/", (request, response) => {
  const statement = `select * from owner`;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//Register owner
router.post("/signup", (request, response) => {
  const { username, email, mobile, password } = request.body;
  const encryptedPassword = String(cryptoJs.SHA256(password));

  let statement = `insert into owner (username, email, mobile, password)
      values(?,?,?,?)`;

  db.pool.execute(
    statement,
    [username, email, mobile, encryptedPassword],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

//login Owner
router.post("/signin", (request, response) => {
  const { email, password } = request.body;
  const encryptedPassword = String(cryptoJs.SHA256(password));

  let statement = `select owner_id, username, email, mobile from owner where email =? and password =? `;

  db.pool.execute(statement, [email, encryptedPassword], (error, result) => {
    if (error) {
      response.send(utils.createError(error));
    } else {
      if (result.length == 0) {
        response.send(utils.createError("Invalid Credentials"));
      } else {
        const { owner_id, username, email, mobile } = result[0];

        const payload = {
          owner_id,
          username,
          email,
          mobile,
        };

        const token = jwt.sign(payload, config.secret);
        response.send(
          utils.createSuccess({
            token,
            owner_id,
            username,
            email,
            mobile,
          })
        );
      }
    }
  });
});

//edit owner
router.put("/:owner_id", (request, response) => {
  const { username, email, mobile, password } = request.body;
  const encryptedPassword = String(cryptoJs.SHA256(password));
  let statement = `update owner set username=?, email=?,
       mobile=?, password=? where owner_id=?`;
  db.pool.execute(
    statement,
    [username, email, mobile, encryptedPassword, request.params.owner_id],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

//delete owner
router.delete("/:owner_id", (request, response) => {
  let statement = `delete from owner where owner_id=?`;
  db.pool.execute(statement, [request.params.owner_id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});


module.exports = router;
