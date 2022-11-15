const express = require('express');
const { getCatsBySpeciesId } = require('./controllers/cats');

const app = express();

app.get('/api/species/:species_id/cats', getCatsBySpeciesId);

app.use((err, req, res, next) => {
  // check the error is one of my custom ones
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'server error!' });
});

module.exports = app;
