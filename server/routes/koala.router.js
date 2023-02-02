const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST
router.post('/', (req, res) => {

    const newKoala = req.body;
    const queryText = `
        INSERT INTO "koalas" ("koalaName", "age", "gender", "markReady", "notes", "remove")
        VALUES ($1 ,$2, $3, $4, $5);
    `;
    const queryParams = [
        newKoala.koalaName,
        newKoala.age,
        newKoala.gender,
        newKoala.markReady,
        newKoala.notes,
        newKoala.remove
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


// DELETE

module.exports = koalaRouter;