const express = require("express");
const db = require("../db");
const router = express.Router();
const utils = require("../utils");
const jwt = require("jsonwebtoken");
const config = require("../config");
const cryptoJs = require("crypto-js");

//get All Owner
router.get("/", (request, response) => {
  const statement = `select * from player`;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//Register player
router.post("/signup", (request, response) => {
  const { name, email, password, mobile, gender, birth_date} = request.body;
  const encryptedPassword = String(cryptoJs.SHA256(password));

  let statement = `insert into player(name, email, password, mobile, gender, birth_date) 
     values(?,?,?,?,?,?);`;

  db.pool.execute(
    statement,
    [ name, email, encryptedPassword, mobile, gender, birth_date],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

//login Owner
router.post("/signin", (request, response) => {
  const { email, password } = request.body;
  const encryptedPassword = String(cryptoJs.SHA256(password));

  let statement = `select player_id, name, email, mobile,gender,birth_date from player where email =? and password =? `;

  db.pool.execute(statement, [email, encryptedPassword], (error, result) => {
    if (error) {
      response.send(utils.createError(error));
    } else {
      if (result.length == 0) {
        response.send(utils.createError("Invalid Credentials"));
      } else {
        const { player_id, name, email, mobile,gender,birth_date } = result[0];

        const payload = {
          player_id,
          name,
          email,
          mobile,
          gender,
          birth_date,
        };

        const token = jwt.sign(payload, config.secret);
        response.send(
          utils.createSuccess({
            token,
            player_id,
            name,
            email,
            mobile,
            gender,
            birth_date,
          })
        );
      }
    }
  });
});

//edit player
router.put("/:player_id", (request, response) => {
  const { player_id } = request.params;
  const { name, email, password, mobile, gender, birth_date } = request.body;
  const encryptedPassword = String(cryptoJs.SHA256(password));

  let statement = `update player set name =?, email =?, password =?, mobile =?, gender =?, birth_date =? where player_id =?`;

  db.pool.execute(
    statement,
    [ name, email, encryptedPassword, mobile, gender, birth_date, player_id],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

//delete player
router.delete("/:player_id", (request, response) => {
  const { player_id } = request.params;

  let statement = `delete from player where player_id =?`;

  db.pool.execute(statement, [player_id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;
