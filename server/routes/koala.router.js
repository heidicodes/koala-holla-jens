const express = require("express");
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION

// GET
koalaRouter.get("/", (req, res) => {
  let queryText = `SELECT * FROM "koalas"
  ORDER BY id ASC;`;
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
        newKoala.koalaname,
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
koalaRouter.put('/:id', (req, res) => {
    const queryText = `
    UPDATE koalas 
    SET "ready"= $1
    WHERE id=$2;
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

koalaRouter.put('/edit/:id', (req, res) => {
    const queryText = `
    UPDATE koalas 
    SET "koalaname"= $2,"gender"=$3,"age"=$4,"notes"=$5
    WHERE id=$1;
    `;
    const queryParams = 
    [req.params.id,
        req.body.koalaname,
        req.body.gender,
        req.body.age,
        req.body.notes];
    pool.query(queryText, queryParams)
    .then((dbRes) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('PUT /koalas/edit/:id failed', error)
    });
});

// DELETE
koalaRouter.delete('/:id', (req, res) => {
    let query = `
    DELETE FROM "koalas"
    WHERE "id"=$1`;

    let params=([req.params.id]);

    pool.query(query, params)    
    .then((dbRes) => {
        res.sendStatus(204);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});


module.exports = koalaRouter;
