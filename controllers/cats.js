const { fetchCatsBySpeciesId, fetchCats } = require('../models/cats');

exports.getCatsBySpeciesId = (req, res, next) => {
  const { species_id } = req.params;
  fetchCatsBySpeciesId(species_id)
    .then((cats) => {
      res.status(200).send({ cats });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCats = (req, res, next) => {
  fetchCats()
    .then((cats) => {
      res.status(200).send({ cats });
    })
    .catch((err) => {
      next(err);
    });
};
