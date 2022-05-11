require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const db = require("./db"); // = ("./db/index")

const bcrypt = require("bcrypt");
const saltRounds = 10;

//middleware
app.use(cors());
app.use(express.json());

// app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static("./client/build"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

// create a user

app.post("/api/v1/collisions/signup", async (req, res) => {
  try {
    const { username } = req.body;
    const { password } = req.body;
    const { name } = req.body;
    const { badge_number } = req.body;

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err);
      }
      // db.query("DELETE FROM collisions WHERE collision_id = $1", [req.params.id]);
      const validate = await db.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      if (validate.rows.length != 0) {
        res.json(null);
      }
      const response = await db.query(
        "INSERT INTO users (username, password, name, badge_number) VALUES($1, $2, $3, $4) RETURNING *",
        [username, hash, name, badge_number]
      );
      res.json(response.rows);
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/api/v1/collisions/login", (req, res) => {
  try {
    const { username } = req.body;
    const { password } = req.body;

    db.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result.rows.length > 0) {
          bcrypt.compare(
            password,
            result.rows[0].password,
            (error, response) => {
              if (response) {
                res.send(result.rows[0]);
              } else {
                res.send(null);
              }
            }
          );
          // res.send(result.rows[0]);
        } else {
          res.send(null);
        }
      }
    );
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/api/v1/collisions/updateCollision", async (req, res) => {
  try {
    const { crash_date } = req.body;
    const { crash_time } = req.body;
    const { borough } = req.body;
    const { zip_code } = req.body;
    const { latitude } = req.body;
    const { longitude } = req.body;
    const { on_street_name } = req.body;
    const { cross_street_name } = req.body;
    const { off_street_name } = req.body;
    const { number_of_persons_injured } = req.body;
    const { number_of_persons_killed } = req.body;
    const { contributing_factor_vehicle_1 } = req.body;
    const { contributing_factor_vehicle_2 } = req.body;
    const { contributing_factor_vehicle_3 } = req.body;
    const { contributing_factor_vehicle_4 } = req.body;
    const { contributing_factor_vehicle_5 } = req.body;
    const { vehicle_type_code_1 } = req.body;
    const { vehicle_type_code_2 } = req.body;
    const { vehicle_type_code_3 } = req.body;
    const { vehicle_type_code_4 } = req.body;
    const { vehicle_type_code_5 } = req.body;
    const { updating_id } = req.body;
    const response = await db.query(
      "UPDATE collisions SET crash_date = $1, crash_time = $2, borough = $3, zip_code = $4, latitude = $5, longitude = $6, on_street_name = $7, off_street_name = $8, cross_street_name = $9, number_of_persons_injured = $10, number_of_persons_killed = $11, contributing_factor_vehicle_1 = $12, contributing_factor_vehicle_2 = $13, contributing_factor_vehicle_3 = $14, contributing_factor_vehicle_4 = $15, contributing_factor_vehicle_5 = $16, vehicle_type_code_1 = $17, vehicle_type_code_2 = $18, vehicle_type_code_3 = $19, vehicle_type_code_4 = $20, vehicle_type_code_5 = $21 WHERE collision_id = $22 RETURNING *",
      [
        crash_date,
        crash_time,
        borough,
        zip_code,
        latitude,
        longitude,
        on_street_name,
        off_street_name,
        cross_street_name,
        number_of_persons_injured,
        number_of_persons_killed,
        contributing_factor_vehicle_1,
        contributing_factor_vehicle_2,
        contributing_factor_vehicle_3,
        contributing_factor_vehicle_4,
        contributing_factor_vehicle_5,
        vehicle_type_code_1,
        vehicle_type_code_2,
        vehicle_type_code_3,
        vehicle_type_code_4,
        vehicle_type_code_5,
        updating_id,
      ]
    );
    res.json(response.rows);
  } catch (err) {
    console.error(err);
  }
});

app.post("/api/v1/collisions/addCollision", async (req, res) => {
  try {
    const { crash_date } = req.body;
    const { crash_time } = req.body;
    const { borough } = req.body;
    const { zip_code } = req.body;
    const { latitude } = req.body;
    const { longitude } = req.body;
    const { on_street_name } = req.body;
    const { cross_street_name } = req.body;
    const { off_street_name } = req.body;
    const { number_of_persons_injured } = req.body;
    const { number_of_persons_killed } = req.body;
    const { contributing_factor_vehicle_1 } = req.body;
    const { contributing_factor_vehicle_2 } = req.body;
    const { contributing_factor_vehicle_3 } = req.body;
    const { contributing_factor_vehicle_4 } = req.body;
    const { contributing_factor_vehicle_5 } = req.body;
    const { vehicle_type_code_1 } = req.body;
    const { vehicle_type_code_2 } = req.body;
    const { vehicle_type_code_3 } = req.body;
    const { vehicle_type_code_4 } = req.body;
    const { vehicle_type_code_5 } = req.body;
    const response = await db.query(
      "INSERT INTO collisions(crash_date, crash_time, borough, zip_code, latitude, longitude, on_street_name, cross_street_name, off_street_name, number_of_persons_injured, number_of_persons_killed, contributing_factor_vehicle_1, contributing_factor_vehicle_2, contributing_factor_vehicle_3, contributing_factor_vehicle_4, contributing_factor_vehicle_5, vehicle_type_code_1, vehicle_type_code_2, vehicle_type_code_3, vehicle_type_code_4, vehicle_type_code_5) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING *",
      [
        crash_date,
        crash_time,
        borough,
        zip_code,
        latitude,
        longitude,
        on_street_name,
        cross_street_name,
        off_street_name,
        number_of_persons_injured,
        number_of_persons_killed,
        contributing_factor_vehicle_1,
        contributing_factor_vehicle_2,
        contributing_factor_vehicle_3,
        contributing_factor_vehicle_4,
        contributing_factor_vehicle_5,
        vehicle_type_code_1,
        vehicle_type_code_2,
        vehicle_type_code_3,
        vehicle_type_code_4,
        vehicle_type_code_5,
      ]
    );
    res.json(response.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get all records

app.get("/api/v1/collisions/", async (req, res) => {
  try {
    const allUsers = await db.query("SELECT * FROM collisions");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/api/v1/collisions/delete/:id", async (req, res) => {
  try {
    db.query("DELETE FROM collisions WHERE collision_id = $1", [req.params.id]);
    res.json("delete sucess");
  } catch (err) {
    console.log(err);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
