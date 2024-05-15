import express from "express";
import { v4 as uuidv4 } from "uuid";
import response from "../common/response.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { executeQuery } from "../common/common.js";

var router = express.Router();

// display user page
router.get("/", async function (req, res, next) {
  try {
    const query = `SELECT * FROM users`;
    const result = await executeQuery(query, []);
    if (result) {
      console.log("success", result);
      res.send(result);
    } else {
      res.send(response.notFound);
    }
  } catch (error) {}
});

router.post("/createUser", async function (req, res) {
  try {
    const name = req.body.name;
    const password = req.body.password;
    const authToken = req.body.authToken;
    const email = req.body.email;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const query = `INSERT INTO users (id, name, email, password, authToken) VALUES (?, ?, ?, ?, ?);`;
    const result = await executeQuery(query, [
      uuidv4(),
      name,
      email,
      hashedPassword,
      authToken,
    ]);
    console.log(result);
    if (result.affectedRows === 1) {
      console.log(result);
      res.send(response.success);
    } else {
      res.send(response.badRequest);
    }
  } catch (error) {
    res.send(response.internalServerError);
  }
});

router.get("/login", async function (req, res) {
  try {
    const email = req.headers.email;
    const password = req.headers.password;
    const query = `SELECT * FROM users WHERE email = ?`;
    const result = await executeQuery(query, [email]);
    console.log(result);
    if (result) {
      const user = result[0];      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
      if (passwordMatch) {
        // If passwords match, generate and send an authToken
        const authToken = jwt.sign({ userId: user.id }, "your_secret_key", {
          expiresIn: "24h",
        });
        res.send({ authToken });
      } else {
        res.send(response.unauthorized);
      }
    }
  } catch (error) {
    res.send(response.internalServerError);
  }
});

export default router;
