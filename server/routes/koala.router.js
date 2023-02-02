const express = require("express");
const koalaRouter = express.Router();
const pool = require('../modules/pool');

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
koalaRouter.post('/', (req, res) => {

    const newKoala = req.body;
    const queryText = `
        INSERT INTO "koalas" ("koalaname", "age", "gender", "ready", "notes")
        VALUES ($1 ,$2, $3, $4, $5);
    `;
    const queryParams = [
        newKoala.koalaName,
        newKoala.age,
        newKoala.gender,
        newKoala.ready,
        newKoala.notes
    ]
    pool.query(queryText, queryParams)
        .then((result) => {
            console.log("Insert result:", result);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making query ${queryText}`, error);
            res.sendStatus(500);
        })
});

// PUT
koalaRouter.put('/koalas/:id', (req, res) => {
    const queryText = `
    UPDATE koalas 
    SET "ready"= NOT "ready"
    WHERE id=$1;
    `;
    const queryParams = [req.body.ready, req.params.id];
    pool.query(queryText, queryParams)
    .then((dbRes) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('PUT /koalas/:id failed', error)
    });
});

// DELETE

module.exports = koalaRouter;
