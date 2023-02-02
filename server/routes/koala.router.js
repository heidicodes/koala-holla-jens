const express = require("express");
const koalaRouter = express.Router();

// DB CONNECTION

// GET
koalaRouter.get("/", (req, res) => {
  let queryText = `SELECT * FROM "koalas";`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`Error making queryText: ${queryText}`, err);
      res.sendStatus(500);
    });
});

// POST

// PUT

// DELETE

module.exports = koalaRouter;
